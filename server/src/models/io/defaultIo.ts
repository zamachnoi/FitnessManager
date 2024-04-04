import { Users } from "../../models/db/types"
import { ApiResponse } from "./util"

export type GetUserDbRow = Omit<Users, "user_id"> & { user_id: number }

export type DefaultGetApiResponse = {
	message: string
	status: "success" | "error"
}

export interface GetDefaultApiResponse extends ApiResponse {
	data: GetUserDbRow | null
}

export type DefaultDeleteApiResponse = {
	message: string
	status: "success" | "error"
}
