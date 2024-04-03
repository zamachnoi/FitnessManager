export async function patchData(endpoint: string, data: any) {
  const response = await fetch(`http://localhost:3000/${endpoint}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  return response.json();
}