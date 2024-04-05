import { Rooms, RoomBookings } from "../db/types"

export type RoomAndBookingDbData = Omit<
	Rooms & RoomBookings,
	"room_id" | "booking_id" | "class_time"
> & {
	room_id: number
	booking_id: number | null
	class_time: Date | null
}

export type RoomAndBookingData = {
	room_id: number | null
	name: string | null
	room_number: number | null
	future_bookings: {
		booking_id: number | null
		class_id: number | null
		class_time: Date | null
	}[]
}

export type AvailableRoomsResponse = {
	message: string
	status: number
	data: number[] | null
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

export type RoomData = Omit<Rooms, "room_id"> & {
	room_id: number
}

export type RoomApiResponse = {
	message: string
	status: number
	data: RoomData | null
}

export type RoomsApiResponse = {
	message: string
	status: number
	data: RoomData[] | null
}
