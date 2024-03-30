import { Users, Members } from "../db/types"
import { ApiResponse } from "./util"

export type MemberDataResponse = Omit<Users, "user_id" | "password"> & Members

export type MemberApiResponse = Omit<ApiResponse, "data"> & {
	data: Omit<MemberDataResponse, "password"> | null
}

export type MembersApiResponse = Omit<MemberApiResponse, "data"> & {
	data: Omit<MemberDataResponse, "password">[]
}

export type MemberDataInsert = Omit<Users, "user_id" | "type"> &
	Omit<Members, "member_id"> & { type: "Member" }