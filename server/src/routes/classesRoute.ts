import { Router } from "express"
import * as classesController from "../controllers/classesController"

export const classesRoute = Router()

// GET
classesRoute.get("/", async (req, res) => {
	const data = await classesController.generateClassesGetResponse()

	res.status(data.status).json(data)
})

classesRoute.get("/:classId", async (req, res) => {
	const memberId = parseInt(req.params.classId)
	const data =
		await classesController.generateClassesGetByIdResponse(
			memberId
		)

	res.status(data.status).json(data)
})

classesRoute.get("/:memberId/bookable", async (req, res) => {
	const memberId = parseInt(req.params.memberId)
	const data =
		await classesController.generateBookableClassesGetResponse(
			memberId
		)

	res.status(data.status).json(data)
})

// POST
classesRoute.post("/", async (req, res) => {
	const classRequest = req.body
	const data =
		await classesController.generateClassesPostResponse(
			classRequest
		)

	res.status(data.status).json(data)
})
