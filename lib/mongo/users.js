export async function getUserByEmail() {
  console.log("lib function get user")
  return "lib get user"
}
export async function updateUserProfile(dataObj) {
  return await fetch(`/api/mongo/users/${dataObj.email}`, {
    method: "PUT",
    body: JSON.stringify(dataObj),
  }).then((response) => response.json());
}

export async function getAllUsers() {
  return await fetch(`/api/mongo/users/`, {
    method: "GET",
  }).then((response) => response.json());
}

