import { Router } from "express"
import * as memberHealthStatsController from "../controllers/memberHealthStatsController"

export const memberHealthStatsRoute = Router()

// GET
memberHealthStatsRoute.get("/:memberId/stats", async (req, res) => {
	const memberId = parseInt(req.params.memberId)
	const data =
		await memberHealthStatsController.generateMemberHealthStatsGetResponse(
			memberId
		)

	res.status(data.status).json(data)
})

memberHealthStatsRoute.get("/:memberId/stats/:statId", async (req, res) => {
	const memberId = parseInt(req.params.memberId)
	const statId = parseInt(req.params.statId)
	const data =
		await memberHealthStatsController.generateMemberHealthStatsGetByIdResponse(
			memberId,
			statId
		)

	res.status(data.status).json(data)
})

// POST
memberHealthStatsRoute.post("/:memberId/stats", async (req, res) => {
	const memberId = parseInt(req.params.memberId)
	const stats = req.body
	const data =
		await memberHealthStatsController.generateMemberHealthStatsPostResponse(
			memberId,
			stats
		)

	res.status(data.status).json(data)
})
