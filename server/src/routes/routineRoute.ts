import { Router } from "express"
import * as routineController from "../controllers/routineController"

export const routineRoute = Router()

// GET
routineRoute.get("/routines", async (req, res) => {
	const data = await routineController.generateRoutinesGetResponse()
	res.status(data.status).json(data)
})

// GET BY ID
routineRoute.get("/routines/:id", async (req, res) => {
	const id = parseInt(req.params.id)
	const data = await routineController.generateRoutineByIdGetResponse(id)
	res.status(data.status).json(data)
})

// get member routines
routineRoute.get("/members/:id/routines", async (req, res) => {
	const memberId = parseInt(req.params.id)
	const data = await routineController.generateRoutinesByMemberIdGetResponse(
		memberId
	)
	res.status(data.status).json(data)
})

// POST

routineRoute.post("/routines", async (req, res) => {
	const data = await routineController.generateCreateRoutinePostResponse(
		req.body
	)
	res.status(data.status).json(data)
})

// assign routine to member
routineRoute.patch(
	"/members/:memberId/routines/:routineId/assign",
	async (req, res) => {
		const member_id = parseInt(req.params.memberId)
		const routine_id = parseInt(req.params.routineId)

		const routineAssignRequest = {
			member_id,
			routine_id,
		}
		const data =
			await routineController.generateAssignRoutineToMemberPatchResponse(
				routineAssignRequest
			)
		res.status(data.status).json(data)
	}
)

// unassign routine to member
routineRoute.patch(
	"/members/:memberId/routines/:routineId/unassign",
	async (req, res) => {
		const member_id = parseInt(req.params.memberId)
		const routine_id = parseInt(req.params.routineId)

		const routineAssignRequest = {
			member_id,
			routine_id,
		}
		const data =
			await routineController.generateUnassignRoutineFromMemberPatchResponse(
				routineAssignRequest
			)
		res.status(data.status).json(data)
	}
)
