export async function patchData(endpoint: string, data: any) {
	console.log(data)
	const response = await fetch(`http://localhost:3000/${endpoint}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify(data),
	})
	return response.json()
}
