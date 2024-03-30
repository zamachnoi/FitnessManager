import { Router } from "express"
import * as memberGoalController from "../controllers/memberGoalController"

export const memberGoalRoute = Router()

// GET
memberGoalRoute.get("/:memberId/goals", async (req, res) => {
	const memberId = parseInt(req.params.memberId)
	const data = await memberGoalController.generateMemberGoalsGetResponse(
		memberId
	)

	res.status(data.status).json(data)
})

memberGoalRoute.get("/:memberId/goals/:goalId", async (req, res) => {
	const memberId = parseInt(req.params.memberId)
	const goalId = parseInt(req.params.goalId)
	const data = await memberGoalController.generateMemberGoalByIdGetResponse(
		memberId,
		goalId
	)

	res.status(data.status).json(data)
})

// POST
memberGoalRoute.post("/:memberId/goals", async (req, res) => {
	const memberId = parseInt(req.params.memberId)
	const goal = req.body
	const data = await memberGoalController.generateMemberGoalPostResponse(
		memberId,
		goal
	)

	res.status(data.status).json(data)
})

memberGoalRoute.patch("/:memberId/goals/:goalId/achieve", async (req, res) => {
	const memberId = parseInt(req.params.memberId)
	const goalId = parseInt(req.params.goalId)
	const data =
		await memberGoalController.generateMemberGoalAchievePatchResponse(
			memberId,
			goalId
		)

	res.status(data.status).json(data)
})

memberGoalRoute.patch("/:memberId/goals/:goalId/delete", async (req, res) => {
	const memberId = parseInt(req.params.memberId)
	const goalId = parseInt(req.params.goalId)
	const data =
		await memberGoalController.generateMemberGoalDeletePatchResponse(
			memberId,
			goalId
		)

	res.status(data.status).json(data)
})
