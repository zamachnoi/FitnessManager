import { Users } from "../db/types"

export type AccountData = Omit<Users, "user_id" | "password"> & {
	user_id: number
}

export type LoginApiRequest = {
	username: string
	password: string
}

export type getDetails = {}

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
	first_name: string
	last_name: string
	type: "Member" | "Trainer" | "Admin"
}

export type RegisterApiResponse = {
	status: number
	message: string
	data: AccountData | null
}
