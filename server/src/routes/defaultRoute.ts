import { Router } from "express"
import * as defaultController from "../controllers/defaultController"

export const defaultRoute = Router()

// GET
defaultRoute.get("/", async (req, res) => {
	const data = await defaultController.generateDefaultGetResponse()

	if (data.status === "success") {
		res.status(200).json(data)
	}
	if (data.status === "error") {
		res.status(404).json(data)
	}
})
