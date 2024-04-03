import { db } from "../lib/db"
import {
	RoomAndBookingData, RoomData
} from "../models/io/roomAndBookingIo"

export async function getAllRooms(
): Promise<RoomData[]> {
	const rooms = await db
		.selectFrom("room")
		.selectAll()
		.execute()
	return rooms
}

export async function getRoomAndBookingbyId(
	roomId: number,
): Promise<RoomAndBookingData> {

	const roomAndBookings = await db
		.transaction()
		.execute(async (transaction) => {
			// check if room is exists
			const room = await transaction
			.selectFrom("room")
			.where("room_id", "=", roomId)
			.selectAll()
			.executeTakeFirst()

			if (!room) {
				throw new Error("No such room found")
			}

			const bookingData = await transaction
			.selectFrom("room_bookings")
			.where("room_id", "=", roomId)
			.selectAll()
			.execute()

			const futureBookings = bookingData.map((booking) => {
					return {
						booking_id: booking.booking_id,
						class_id: booking.class_id,
						room_booking_timestamp: booking.class_time,
					}
				})

			const roomAndBookingData = {
				room_id: room.room_id,
				name: room.name,
				future_bookings: futureBookings
			}

			return roomAndBookingData
		})
		return roomAndBookings
}
