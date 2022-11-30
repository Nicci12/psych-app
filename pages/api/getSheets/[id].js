const { google } = require("googleapis");

const scopes = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

const credentialsJSON = process.env.GOOGLE_CREDENTIALS_JSON;
console.log("credentials", credentialsJSON)
const stringToBase64 = Buffer.from(credentialsJSON).toString("base64");
console.log("string", stringToBase64)
const credentials = JSON.parse(
  Buffer.from(stringToBase64, "base64").toString()
);
console.log("buffer", credentials)
const client = new google.auth.GoogleAuth({
  credentials,
  scopes,
});
console.log("client", client)
const sheets = google.sheets({ version: "v4", auth: client });
console.log("sheets", sheets)

const getGoogleSheet = (reqBody, sendResponse) => {
  sheets.spreadsheets.values.get(
    {
      spreadsheetId: "1_gFSgQDbFOgxSsZXuckmu3bzN3qyvxKoToDsJInUVxI",
      range: "Sheet1!A1:B3",
    },
    (err, res) => {
      if (err) return console.log("The API returned an error: " + err);
      const rows = res.data.values;
      console.log("rows", rows)
      sendResponse.json({data:"data"})
    })
  }
  

export default function handler(req, res) {
  try {
    getGoogleSheet(req.body, res);
  } catch (error) {
    res.status(400).send("Error.");
  }
}