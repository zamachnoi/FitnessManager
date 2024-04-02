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
		const booking = await memberTrainerBookingData.bookTrainer(
			member_id,
			bookingRequest
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
	const timestampInt = request.timestamp

	const timestamp = new Date(timestampInt)

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
