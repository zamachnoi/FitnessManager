import { db } from "../lib/db"
import { RoomAndBookingDbData } from "../models/io/roomIo"

export async function getRoomsAndBooking(
	roomId?: number
): Promise<RoomAndBookingDbData[]> {
	const query = db
		.selectFrom("rooms")
		.leftJoin(
			(eb) =>
				eb
					.selectFrom("room_bookings")
					.select([
						"room_bookings.room_id",
						"room_bookings.class_id",
						"room_bookings.class_time",
						"room_bookings.booking_id",
					])
					.where("class_time", ">", new Date())
					.as("future_bookings"),
			(join) =>
				join.onRef("rooms.room_id", "=", "future_bookings.room_id")
		)
		.select([
			"rooms.room_id",
			"name",
			"class_id",
			"class_time",
			"booking_id",
			"rooms.room_number",
		])

	if (roomId) {
		query.where("room_id", "=", roomId)
	}

	const roomAndBooking = await query.execute()

	return roomAndBooking
}
