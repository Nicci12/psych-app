export async function getUserByEmail(user) {
  return await fetch(`/api/mongo/users/${user.email}`, {
    method: "GET",
  }).then((response) => response.json());
}