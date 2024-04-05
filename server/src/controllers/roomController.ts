import {
	RoomAndBookingArrayApiResponse,
	RoomAndBookingApiResponse,
	RoomAndBookingDbData,
	RoomAndBookingData,
	RoomsApiResponse,
} from "../models/io/roomIo"
import { getRoomsAndBooking, getAvailableRooms } from "../data/roomData"

export async function generateRoomByIdGetResponse(
	roomId: number
): Promise<RoomAndBookingApiResponse> {
	try {
		const roomsAndBookingDbData = await getRoomsAndBooking(roomId)

		const res = transformDbToResponseData(roomsAndBookingDbData)

		return {
			message: "Room and booking data",
			status: 200,
			data: res[0],
		}
	} catch (error) {
		return {
			message: "Error finding room and booking data",
			status: 404,
			data: null,
		}
	}
}

export async function generateRoomsGetResponse(): Promise<RoomAndBookingArrayApiResponse> {
	try {
		const roomsAndBookingDbData = await getRoomsAndBooking()

		const res = transformDbToResponseData(roomsAndBookingDbData)

		return {
			message: "Rooms and bookings",
			status: 200,
			data: res,
		}
	} catch (error) {
		return {
			message: "Error finding rooms and bookings",
			status: 404,
			data: null,
		}
	}
}

function transformDbToResponseData(
	data: RoomAndBookingDbData[]
): RoomAndBookingData[] {
	const groupedByRoomId = data.reduce<Record<number, RoomAndBookingData>>(
		(acc, item) => {
			if (!acc[item.room_id]) {
				acc[item.room_id] = {
					room_id: item.room_id,
					name: item.name,
					room_number: item.room_number,
					future_bookings: [],
				}
			}

			if (
				item.class_id !== null &&
				item.class_time !== null &&
				item.booking_id !== null
			) {
				acc[item.room_id].future_bookings.push({
					class_id: item.class_id,
					class_time: new Date(item.class_time),
					booking_id: item.booking_id,
				})
			}

			return acc
		},
		{}
	) // This empty object is now understood to be of type Record<number, RoomAndBookingData>

	return Object.values(groupedByRoomId)
}

export async function generateAvailableRoomsGetResponse(
	timestamp: Date
): Promise<RoomsApiResponse> {
	try {
		const availableRooms = await getAvailableRooms(timestamp)

		return {
			message: "Available rooms",
			status: 200,
			data: availableRooms,
		}
	} catch (error) {
		return {
			message: "Error finding available rooms",
			status: 404,
			data: null,
		}
	}
}
