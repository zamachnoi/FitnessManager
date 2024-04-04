export async function postData(endpoint: string, data: any) {
	const response = await fetch(`http://localhost:3000/${endpoint}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify(data),
	})
	console.log(response)
	return response.json()
}
