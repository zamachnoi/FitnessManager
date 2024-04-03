import { Room, RoomBookings } from "../db/types"

export type RoomData = Omit<Room, "room_id"> & {
	room_id: number
}

export type RoomAndBookingData = {
	room_id: number | null
	name: string | null
	future_bookings: {
		booking_id: number | null
		class_id: number | null
		class_time: Date | null
	}[]
}

export type RoomArrayApiResponse = {
	message: string
	status: number
	data: RoomData[] | null
}

export type RoomAndBookingApiResponse = {
	message: string
	status: number
	data: RoomAndBookingData | null
}

export type RoomAndBookingArrayApiResponse = {
	message: string
	status: number
	data: RoomAndBookingData[] | null
}
