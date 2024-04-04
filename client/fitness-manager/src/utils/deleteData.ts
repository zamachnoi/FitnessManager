export async function deleteData(endpoint: string, data: any) {
  const response = await fetch(`http://localhost:3000/${endpoint}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  })
  return response.json()

}