import { MemberTrainerBooking, MemberBookings } from "../db/types"

// MemberTrainerBooking
export type MemberTrainerBookingData = MemberTrainerBooking & {
	booking_timestamp: Date
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

// MemberAvailableHours
export type MemberAvailableHoursResponse = {
	status: number
	message: string
	data: number[] // 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
}

export type MemberBookingData = {
	trainer_bookings: {
		trainer_id: number | null
		first_name: string | null
		last_name: string | null
		rate: number | null
		booking_timestamp: Date | null
		member_booking_id: number | null
		trainer_booking_id: number | null
	}[]
	class_bookings: {
		class_id: number | null
		name: string | null
		price: number | null
		first_name: string | null
		last_name: string | null
		room_number: number | null
		booking_timestamp: Date | null
		member_booking_id: number | null
	}[]
}

export type MemberBookingsResponse = {
	status: number
	message: string
	data: MemberBookingData | null
}

export type MemberClassBookingData = {
	class_id: number | null
	member_id: number | null
	booking_timestamp: Date | null
	class_name: string | null
	price: number | null
	first_name: string | null
	last_name: string | null
	room_number: number | null
	name: string | null
}

export type MemberClassBookingResponse = {
	status: number
	message: string
	data: MemberClassBookingData | null
}
