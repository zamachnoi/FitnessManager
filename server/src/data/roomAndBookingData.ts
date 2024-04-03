import { db } from "../lib/db"
import { RoomAndBookingData, RoomData } from "../models/io/roomAndBookingIo"

export async function getAllRooms(): Promise<RoomData[]> {
	const rooms = await db.selectFrom("room").selectAll().execute()
	return rooms
}

export async function getAllRoomsAndBookings(): Promise<RoomAndBookingData[]> {
	const roomAndBookings = await db
		.selectFrom("room")
		.innerJoin("room_bookings", "room.room_id", "room_bookings.room_id")
		.where("room_bookings.class_time", ">", new Date())
		.selectAll()
		.execute()

	console.log(roomAndBookings)

	return roomAndBookings
}

interface RoomAndBookingDbData {
	room_id: number
	name: string
	class_id: number
	class_time: Date
	booking_id: number
}
export async function getRoomAndBookingbyId(
	roomId: number
): Promise<RoomAndBookingData> {
	const roomAndBookings = await db
		.selectFrom("room")
		.innerJoin("room_bookings", "room.room_id", "room_bookings.room_id")
		.where("room_id", "=", roomId)
		.where("class_time", ">", new Date())
		.select(["room_id", "name", "class_id", "class_time", "booking_id"])
		.execute()

	// roomAndBookings [{1, "room1", 1, "2021-08-01T00:00:00.000Z", 1}, {1, "room1", 2, "2021-08-01T00:00:00.000Z", 2}]
	console.log(roomAndBookings)

	return returnData
}
