export async function postData(endpoint: string, data: any) {
  const response = await fetch(`http://localhost:3000/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  return response.json();
}