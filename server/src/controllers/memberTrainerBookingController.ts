import {
	MemberTrainerBookingRequest,
	MemberTrainerBookingResponse,
	AvailableTrainersResponse,
	AvailableTrainersRequest,
} from "../models/io/memberTrainerBookingIo"

import * as memberTrainerBookingData from "../data/memberTrainerBookingData"

export async function generateMemberTrainerBookingPostRespoonse(
	member_id: number,
	bookingRequest: MemberTrainerBookingRequest
): Promise<MemberTrainerBookingResponse> {
	try {
		const timestamp = new Date(bookingRequest.booking_timestamp)

		const bookTrainerData = bookingRequest

		bookTrainerData.booking_timestamp = timestamp
		const booking = await memberTrainerBookingData.bookTrainer(
			member_id,
			bookTrainerData
		)

		return {
			message: `success`,
			status: 200,
			data: booking,
		}
	} catch (e) {
		return {
			message: "Could not book trainer",
			status: 404,
			data: null,
		}
	}
}

export async function generateAvailableTrainersGetResponse(
	request: AvailableTrainersRequest
): Promise<AvailableTrainersResponse> {
	const timestamp = new Date(request.booking_timestamp)

	try {
		const trainers = await memberTrainerBookingData.getAvailableTrainers(
			timestamp
		)

		return {
			message: `success`,
			status: 200,
			data: trainers,
		}
	} catch (e) {
		return {
			message: "Could not find available trainers",
			status: 404,
			data: [],
		}
	}
}

export async function generateMemberAvailableHoursGetResponse(
	memberId: number,
	day: Date
): Promise<AvailableTrainersResponse> {
	const dateString = day.toISOString().split("T")[0]
	console.log(dateString)

	console.log(memberId, dateString)
	try {
		const hours = await memberTrainerBookingData.getMemberAvailableHours(
			memberId,
			dateString
		)

		return {
			message: `success`,
			status: 200,
			data: hours,
		}
	} catch (e) {
		console.log(e)
		return {
			message: "Could not find available hours",
			status: 404,
			data: [],
		}
	}
}
