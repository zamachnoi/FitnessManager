import { Users, Members } from "../db/types"

export type MemberDataResponse = Omit<Users, "user_id" | "password"> & Members

export type MemberDataInsert = Omit<Users, "user_id" | "type"> & Members & { type: "Member" }

export type MemberApiResponse = {
	message: string
	status: number
	data: MemberDataResponse | null
}

export type MemberArrayApiResponse = {
	message: string
	status: number
	data: MemberDataResponse[] | null
}