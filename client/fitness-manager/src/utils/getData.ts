export async function getData(endpoint: string) {
  const response = await fetch(`http://localhost:3000/${endpoint}`)
  const data = await response.json()
  return data
}