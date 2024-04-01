export type AccountData = {
	user_id: number
	username: string
}

export type LoginApiRequest = {
	username: string
	password: string
}

export type LoginApiResponse = {
	status: number
	message: string
	data: AccountData | null
}

export type LogoutApiResponse = {
	status: number
	message: string
}

export type RegisterApiRequest = {
	username: string
	password: string
	type: "Member" | "Trainer" | "Admin"
}

export type RegisterApiResponse = {
	status: number
	message: string
	data: AccountData | null
}
