import { RoomAndBookingArrayApiResponse } from "../models/io/roomAndBookingIo"
import { getRoomAndBookingbyId } from "../data/roomAndBookingData"

export async function generateGetRoomAndBookingGetResponse(): Promise<RoomAndBookingArrayApiResponse> {
	const roomAndBookingData = await getRoomAndBookingbyId(1)
	return {
		message: "Room and booking data",
		status: 200,
		data: [roomAndBookingData],
	}
}
