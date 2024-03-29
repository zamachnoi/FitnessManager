import { Users } from "../db/types"
import { ApiResponse } from "./util"

export type UserDbRow = Omit<Users, "user_id"> & {
	user_id: number
}

export type UserApiResponse = Omit<ApiResponse, "data"> & {
	data: Omit<UserDbRow, "password"> | null
}

export type UsersApiResponse = Omit<UserApiResponse, "data"> & {
	data: Omit<UserDbRow, "password">[]
}
