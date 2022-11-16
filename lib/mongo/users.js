export async function getUserByEmail(dataObj) {
  return await fetch(`/api/mongo/users/${dataObj.email}`, {
    method: "GET",
  }).then((response) => response.json());
}

export async function updateUserProfile(dataObj) {
  return await fetch(`/api/mongo/users/${dataObj.email}`, {
    method: "PUT",
    body: JSON.stringify(dataObj),
  }).then((response) => response.json());
}

export async function getAllUsers(dataObj) {
  return await fetch(`/api/mongo/users/${dataObj.email}`, {
    method: "GET",
  }).then((response) => response.json());
}

