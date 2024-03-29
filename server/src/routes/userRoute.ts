import { Router } from "express"
import * as userController from "../controllers/userController"

export const userRoute = Router()

// GET
userRoute.get("/", async (req, res) => {
	const data = await userController.generateAllUsersGetResponse()

	res.status(data.status).json(data)
})

userRoute.get("/:id", async (req, res) => {
	const id = parseInt(req.params.id)
	const data = await userController.generateUserByIdGetResponse(id)

	res.status(data.status).json(data)
})

userRoute.get("/username/:username", async (req, res) => {
	const username = req.params.username
	const data = await userController.generateUserByUsernameGetResponse(
		username
	)

	res.status(data.status).json(data)
})
