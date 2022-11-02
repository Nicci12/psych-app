export async function getUserByEmail(dataObj) {
  return await fetch(`/api/mongo/users/${dataObj.email}`, {
    method: "GET",
  }).then((response) => response.json());
}