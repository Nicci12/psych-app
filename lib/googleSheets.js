import { getToken } from "next-auth/jwt";
import { google } from "googleapis";

const secret = process.env.NEXTAUTH_SECRET;
const accessToken = process.env.ACCESS_TOKEN
// let accessToken;

export default async (req, res) => {
  const parsedReq = JSON.parse(req.body);

  const clientId = process.env.GOOGLE_ID;
  const clientSecret = process.env.GOOGLE_SECRET;
  const redirect_url= process.env.REDIRECT_URL
  const auth = new google.auth.OAuth2({
    clientId,
    clientSecret,
    redirect_url
  });

  const token = await getToken({ req, secret });
  accessToken = token?.accessToken;

  auth.setCredentials({
    access_token: accessToken,
  });

  let sheetReport;
  let reportSheet;
  let sheetData;

  const sheets = google.sheets({ version: "v4", auth });

  const getSheetReport = async () => {
    const request = {
      spreadsheetId: parsedReq.sheet_id,
      ranges: ["Sheet1" + "!A1:B10"],
      includeGridData: true,
      auth: auth,
    };
    const response = (await sheets.spreadsheets.get(request)).data;
    return response;
  };

  const getSheetData = async (theSheet) => {
    return theSheet[0].data[0].rowData.map((item) => {
      console.log(item.values[0]);
      return {
        column_a: item.values[0].effectiveValue.numberValue,
        column_b: item.values[1].effectiveValue.numberValue,
      };
    });
  };

  const getSheetAndData = async () => {
    // GET SHEET REPORT
    sheetReport = await getSheetReport();
    // CHECK IF SHEET EXISTS
    reportSheet = sheetReport.sheets.filter((item) => {
      return (
        item.properties.title.toLowerCase() ===
        "report: " + parsedReq.sheet_name
      );
    });
    // RETURN DATA
    let sheetData = await getSheetData(reportSheet);
    return sheetData;
  };

try {
    // GET SHEET
    sheetReport = await getSheetReport();
    // CHECK IF SHEET EXISTS
    reportSheet = sheetReport.sheets.filter((item) => {
      return item.properties.title.toLowerCase() === parsedReq.sheet_name;
    });

    if (reportSheet.length >= 1) {
      reportSheet[0].data.map(async (item) => {
        // DOC EXISTS WITH THE DATA
        if (
          item.rowData &&
          item.rowData[0] &&
          item.rowData[0].values[0].effectiveValue
        ) {
          sheetData = await getSheetAndData();
          res.status(200).json({ sheetData });
        }
      });
    }
  } catch (err) {
    // SHEET DOES NOT EXIST
    res.status(500).json({ sheetData: "error financial data" });
  }
};