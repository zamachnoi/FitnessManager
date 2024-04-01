import { Users } from "../db/types"
import { ApiResponse } from "./util"

export type UserData = Omit<Users, "user_id" | "password"> & {
	user_id: number
}

export type UserApiRequest = Omit<Users, "user_id">

export type UserApiResponse = Omit<ApiResponse, "data"> & {
	data: UserData | null
}

export type UsersApiResponse = Omit<UserApiResponse, "data"> & {
	data: UserData[]
}
