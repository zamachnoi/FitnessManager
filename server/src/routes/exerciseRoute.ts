import * as ExerciseController from "../controllers/exerciseController"
import { Router } from "express"

export const exerciseRoute = Router()

exerciseRoute.get("/", async (req, res) => {
	const data = await ExerciseController.generateExercisesGetResponse()
	res.status(data.status).json(data)
})

exerciseRoute.get("/:id", async (req, res) => {
	const id = parseInt(req.params.id)
	const data = await ExerciseController.generateExerciseByIdGetResponse(id)
	res.status(data.status).json(data)
})

exerciseRoute.post("/", async (req, res) => {
	const data = await ExerciseController.generateExercisePostResponse(req.body)
	res.status(data.status).json(data)
})
