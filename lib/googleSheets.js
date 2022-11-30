 export async function  googleSheets(){
  return await fetch(`/api/sheets/getSheets/[id]`, {
    method: "GET",
  }).then((response) => {return response.json()})}
  
 


