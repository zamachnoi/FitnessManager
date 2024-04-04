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

memberRoute.get("/profile/:name", async (req, res) => {
	const Name = req.params.name
	if(!(Name.includes(" "))){
		const data = await memberController.generateSearchMembersProfilePartNameGetResponse(
			Name
		)
		res.status(data.status).json(data)
	}
	else{
		const [firstName, lastName] = Name.split(' ')
		const data = await memberController.generateSearchMembersProfileFullNameGetResponse(
			firstName,lastName
		)
		res.status(data.status).json(data)
	}
})

// POST
memberRoute.post("/", async (req, res) => {
	const data = await memberController.generateMemberPostResponse(req.body)

	res.status(data.status).json(data)
})

// PATCH
memberRoute.patch("/:id", async (req, res) => {
	const id = parseInt(req.params.id)
	const data = await memberController.generateMemberPatchResponse(
		id,
		req.body
	)

	res.status(data.status).json(data)
})
