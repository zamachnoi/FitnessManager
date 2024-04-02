import { MemberTrainerBooking } from "../db/types"

export type MemberTrainerBookingData = MemberTrainerBooking & {
	booking_date_and_time: Date
}

export type MemberTrainerBookingRequest = {
	trainer_id: number
	booking_date_and_time: Date
}

export type MemberTrainerBookingResponse = {
	status: number
	message: string
	data: MemberTrainerBookingData | null
}

export type AvailableTrainersResponse = {
	status: number
	message: string
	data: number[]
}

export type AvailableTrainersRequest = {
	timestamp: number
}
