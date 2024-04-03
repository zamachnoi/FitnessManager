import { Router } from "express"

import { MemberTrainerBookingRequest } from "../models/io/memberTrainerBookingIo"
import * as memberTrainerBookingController from "../controllers/memberTrainerBookingController"

export const memberTrainerBookingRoute = Router()

memberTrainerBookingRoute.get(
	"/:id/booking/trainers/:booking_timestamp",
	async (req, res) => {
		const booking_timestamp = new Date(
			parseInt(req.params.booking_timestamp)
		)

		const data =
			await memberTrainerBookingController.generateAvailableTrainersGetResponse(
				{ booking_timestamp }
			)

		res.status(data.status).json(data)
	}
)

memberTrainerBookingRoute.post("/:id/booking/trainers", async (req, res) => {
	const bookingRequest: MemberTrainerBookingRequest = req.body
	const memberId = parseInt(req.params.id)

	const data =
		await memberTrainerBookingController.generateMemberTrainerBookingPostRespoonse(
			memberId,
			bookingRequest
		)

	res.status(data.status).json(data)
})

memberTrainerBookingRoute.get("/:id/booking/hours/:date", async (req, res) => {
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
