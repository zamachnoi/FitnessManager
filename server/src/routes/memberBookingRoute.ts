import { Router } from "express"

import { MemberTrainerBookingRequest } from "../models/io/memberBookingIo"
import * as memberTrainerBookingController from "../controllers/memberBookingController"

export const memberBookingRoute = Router()

memberBookingRoute.post("/:id/booking/trainers", async (req, res) => {
	const bookingRequest: MemberTrainerBookingRequest = req.body
	const memberId = parseInt(req.params.id)

	const data =
		await memberTrainerBookingController.generateMemberTrainerBookingPostRespoonse(
			memberId,
			bookingRequest
		)

	res.status(data.status).json(data)
})

memberBookingRoute.get("/:id/booking/hours/:date", async (req, res) => {
	const memberId = parseInt(req.params.id)
	const day = new Date(parseInt(req.params.date))

	// change the date to the beginning of the day
	day.setHours(0, 0, 0, 0)

	const data =
		await memberTrainerBookingController.generateMemberAvailableHoursGetResponse(
			memberId,
			day
		)

	res.status(data.status).json(data)
})

memberBookingRoute.get("/:id/booking", async (req, res) => {
	const memberId = parseInt(req.params.id)

	const data =
		await memberTrainerBookingController.generateMemberBookingsGetResponse(
			memberId
		)

	res.status(data.status).json(data)
})

memberBookingRoute.post("/:id/booking/classes/:class_id", async (req, res) => {
	const memberId = parseInt(req.params.id)
	const classId = parseInt(req.params.class_id)

	const data =
		await memberTrainerBookingController.generateMemberClassBookingPostResponse(
			memberId,
			classId
		)

	res.status(data.status).json(data)
})

memberBookingRoute.patch(
	"/:memberId/booking/:memberBookingId/classes/",
	async (req, res) => {
		const memberId = parseInt(req.params.memberId)
		const memberBookingId = parseInt(req.params.memberBookingId)

		const data =
			await memberTrainerBookingController.generateMemberClassBookingPatchResponse(
				memberId,
				memberBookingId
			)

		res.status(data.status).json(data)
	}
)

// DELETE
memberBookingRoute.patch(
	"/:memberId/booking/:memberBookingId/trainers/:trainerBookingId",
	async (req, res) => {
		const memberId = parseInt(req.params.memberId)
		const memberBookingId = parseInt(req.params.memberBookingId)
		const trainerBookingId = parseInt(req.params.trainerBookingId)

		const data =
			await memberTrainerBookingController.generateMemberTrainerBookingPatchResponse(
				memberId,
				memberBookingId,
				trainerBookingId
			)

		res.status(data.status).json(data)
	}
)
