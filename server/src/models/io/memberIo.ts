import { Users, Members } from "../db/types"
import { ApiResponse } from "./util"

export type MemberDataResponse = Omit<Users, "user_id" | "password"> & Members

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

export type MemberDataCreateRequest = {
	weight: number
	first_name: string
	last_name: string
	username: string
	password: string
}

export type MemberDataCreate = {
	userData: {
		username: string
		password: string
		first_name: string
		last_name: string
		type: "Member"
	}

	memberData: {
		member_id?: number
		weight: number
	}
}

export type MemberDataUpdateRequest = {
	weight?: number | null
	first_name?: string | null
	last_name?: string | null
	username?: string | null
	password?: string | null
}

export type MemberDataUpdate = {
	memberData: {
		weight?: number | null
	}
	userData: {
		first_name?: string | null
		last_name?: string | null
		username?: string | null
		password?: string | null
	}
}
