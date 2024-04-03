import { MemberTrainerBooking } from "../db/types"

export type MemberTrainerBookingData = MemberTrainerBooking & {
	booking_timestamp: Date
}

export type AvailableTrainersData = {
	trainer_id: number
	first_name: string | null
	last_name: string | null
	rate: number | null
}

export type MemberTrainerBookingRequest = {
	trainer_id: number
	booking_timestamp: Date
}

export type MemberTrainerBookingResponse = {
	status: number
	message: string
	data: MemberTrainerBookingData | null
}

export type AvailableTrainersResponse = {
	status: number
	message: string
	data: AvailableTrainersData[]
}

export type AvailableTrainersRequest = {
	booking_timestamp: Date
}

export type MemberAvailableHoursResponse = {
	status: number
	message: string
	data: number[] // 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
}
