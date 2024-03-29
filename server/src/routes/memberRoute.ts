import { Router } from "express"
import * as memberController from "../controllers/memberController"

export const memberRoute = Router()

// GET
memberRoute.get("/", async (req, res) => {
	const data = await memberController.generateAllMembersGetResponse()

	res.status(data.status).json(data)
})

memberRoute.get("/:id", async (req, res) => {
	const id = parseInt(req.params.id)
	const data = await memberController.generateMemberByIdGetResponse(id)

	res.status(data.status).json(data)
})

memberRoute.get("/username/:username", async (req, res) => {
	const username = req.params.username
	const data = await memberController.generateMemberByUsernameGetResponse(
		username
	)

	res.status(data.status).json(data)
})

// POST
memberRoute.post("/", async (req, res) => {
	// make sure body is of type MemberDataInsert

	const data = await memberController.generateMemberPostResponse(req.body)

	res.status(data.status).json(data)
})
