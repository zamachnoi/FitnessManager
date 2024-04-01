import { Router } from "express"
import * as trainersController from "../controllers/trainersController"

export const trainerRoute = Router()

// GET
trainerRoute.get("/", async (req, res) => {
	const data = await trainersController.generateAllTrainersGetResponse()

	res.status(data.status).json(data)
})

trainerRoute.get("/:id", async (req, res) => {
	const id = parseInt(req.params.id)
	const data = await trainersController.generateTrainerByIdGetResponse(id)

	res.status(data.status).json(data)
})

trainerRoute.get("/username/:username", async (req, res) => {
	const username = req.params.username
	const data = await trainersController.generateTrainerByUsernameGetResponse(
		username
	)

	res.status(data.status).json(data)
})

// POST
trainerRoute.post("/", async (req, res) => {
	const data = await trainersController.generateTrainerPostResponse(req.body)

	res.status(data.status).json(data)
})

// PATCH
trainerRoute.patch("/:id", async (req, res) => {
	const id = parseInt(req.params.id)
	const data = await trainersController.generateTrainerPatchResponse(
		id,
		req.body
	)

	res.status(data.status).json(data)
})