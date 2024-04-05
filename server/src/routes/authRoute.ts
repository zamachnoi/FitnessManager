import { Router } from "express"
import * as authController from "../controllers/authController"

export const authRoute = Router()

// LOGIN
authRoute.post("/login", async (req, res) => {
	const loginDetails = req.body
	const data = await authController.generateAuthLoginPostResponse(
		req,
		res,
		loginDetails
	)

	const validated = data.data !== null

	if (!validated) {
		return res.status(data.status).json(data)
	}

	res.status(data.status).json(data)
})

// REGISTER
authRoute.post("/register", async (req, res) => {
	const registerDetails = req.body
	const data = await authController.generateAuthRegisterPostResponse(
		req,
		res,
		registerDetails
	)

	res.status(data.status).json(data)
})

authRoute.post("/logout", async (req, res) => {
	const data = await authController.generateAuthLogoutPostResponse(req, res)

	res.status(data.status).json(data)
})

authRoute.get("/dashboard", async (req, res) => {
	const data = authController.generateAuthDashboardGetResponse(req)

	res.status(data.status).json(data)
})
