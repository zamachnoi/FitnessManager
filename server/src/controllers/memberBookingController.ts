import {
	MemberTrainerBookingRequest,
	MemberTrainerBookingResponse,
	MemberAvailableHoursResponse,
	MemberBookingsResponse,
	MemberClassBookingResponse,
} from "../models/io/memberBookingIo"

import * as memberBookingData from "../data/memberBookingData"

export async function generateMemberTrainerBookingPostRespoonse(
	member_id: number,
	bookingRequest: MemberTrainerBookingRequest
): Promise<MemberTrainerBookingResponse> {
	try {
		const timestamp = new Date(bookingRequest.booking_timestamp)

		const bookTrainerData = bookingRequest

		bookTrainerData.booking_timestamp = timestamp
		const booking = await memberBookingData.bookTrainer(
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

export async function generateMemberAvailableHoursGetResponse(
	memberId: number,
	day: Date
): Promise<MemberAvailableHoursResponse> {
	const dateString = day.toISOString().split("T")[0]
	console.log(dateString)

	console.log(memberId, dateString)
	try {
		const hours = await memberBookingData.getMemberAvailableHours(
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

export async function generateMemberBookingsGetResponse(
	memberId: number
): Promise<MemberBookingsResponse> {
	try {
		const memberBookings = await memberBookingData.getMemberBookings(
			memberId
		)

		return {
			message: `success`,
			status: 200,
			data: memberBookings,
		}
	} catch (e) {
		return {
			message: "Could not find member bookings",
			status: 404,
			data: null,
		}
	}
}

export async function generateMemberClassBookingPostResponse(
	memberId: number,
	classId: number
): Promise<MemberClassBookingResponse> {
	try {
		const classBooking = await memberBookingData.bookClass(
			memberId,
			classId
		)
		return {
			message: `success`,
			status: 200,
			data: classBooking,
		}
	} catch (e) {
		return {
			message: "Could not book class",
			status: 404,
			data: null,
		}
	}
}

// DELETE
export async function generateMemberTrainerBookingPatchResponse(
	memberId: number,
	memberBookingId: number,
	trainerBookingId: number
): Promise<MemberTrainerBookingResponse> {
	try {
		await memberBookingData.deleteMemberTrainerBooking(
			memberId,
			memberBookingId,
			trainerBookingId
		)
		return {
			message: `success`,
			status: 200,
			data: null,
		}
	} catch (e) {
		console.log(e)
		return {
			message: "Could not delete class booking",
			status: 404,
			data: null,
		}
	}
}

export async function generateMemberClassBookingPatchResponse(
	memberId: number,
	memberBookingId: number
): Promise<MemberClassBookingResponse> {
	try {
		await memberBookingData.deleteMemberClassBooking(
			memberId,
			memberBookingId
		)
		return {
			message: `success`,
			status: 200,
			data: null,
		}
	} catch (e) {
		console.log(e)
		return {
			message: "Could not delete class booking",
			status: 404,
			data: null,
		}
	}
}
