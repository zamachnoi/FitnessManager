import { Router } from "express"
import { generateMemberViewGetResponse } from "../controllers/memberViewController"

export const memberViewRoute = Router()

memberViewRoute.get("/memberView/:memberId", async (req, res) => {
	console.log("memberViewRoute")
	const memberId = parseInt(req.params.memberId)
	console.log(memberId)
	const response = await generateMemberViewGetResponse(memberId)
	res.status(response.status).send(response)
})
