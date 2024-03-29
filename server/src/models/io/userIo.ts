import { Users } from "../db/types"
import { ApiResponse } from "./util"

export type UserDbRow = Omit<Users, "user_id" | "password"> & {
	user_id: number
}

export type UserApiResponse = Omit<ApiResponse, "data"> & {
	data: UserDbRow | null
}

export type UsersApiResponse = Omit<UserApiResponse, "data"> & {
	data: UserDbRow[]
}

export type UserDataInsert = Omit<Users, "user_id">
