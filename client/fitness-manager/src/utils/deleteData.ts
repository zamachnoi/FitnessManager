export async function deleteData(endpoint: string) {
  const response = await fetch(`http://localhost:3000/${endpoint}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
  const data = await response.json()
  return data
}