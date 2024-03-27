import { Users } from "../../models/db/types"

export type GetUserDbRow = Omit<Users, "user_id"> & { user_id: number }

export type DefaultGetApiResponse = {
	message: string
	status: "success" | "error"
}
