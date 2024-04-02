import { Router } from "express"

import { MemberTrainerBookingRequest } from "../models/io/memberTrainerBookingIo"
import * as memberTrainerBookingController from "../controllers/memberTrainerBookingController"

export const memberTrainerBookingRoute = Router()

memberTrainerBookingRoute.get(
	"/:memberId/trainers/:timestamp",
	async (req, res) => {
		const timestamp = parseInt(req.params.timestamp)

		const data =
			await memberTrainerBookingController.generateAvailableTrainersGetResponse(
				{ timestamp }
			)

		res.status(data.status).json(data)
	}
)

memberTrainerBookingRoute.post("/:memberId/trainers/book", async (req, res) => {
	const bookingRequest: MemberTrainerBookingRequest = req.body
	const memberId = parseInt(req.params.memberId)

	const data =
		await memberTrainerBookingController.generateMemberTrainerBookingPostRespoonse(
			memberId,
			bookingRequest
		)

	res.status(data.status).json(data)
})
