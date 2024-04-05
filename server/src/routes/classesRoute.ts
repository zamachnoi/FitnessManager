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
	const data = await classesController.generateClassesGetByIdResponse(
		memberId
	)

	res.status(data.status).json(data)
})

classesRoute.get("/:memberId/bookable", async (req, res) => {
	const memberId = parseInt(req.params.memberId)
	const data = await classesController.generateBookableClassesGetResponse(
		memberId
	)

	res.status(data.status).json(data)
})

// POST
classesRoute.post("/", async (req, res) => {
	const classRequest = req.body
	const data = await classesController.generateClassesPostResponse(
		classRequest
	)

	res.status(data.status).json(data)
})

// DELETE
classesRoute.delete("/:classId", async (req, res) => {
	const classId = parseInt(req.params.classId)
	await classesController.generateClassesDeleteResponse(classId)

	res.status(200).json({ message: "success" })
})

// PATCH
classesRoute.patch("/reschedule/:classId/:timestamp", async (req, res) => {
	const classId = parseInt(req.params.classId)
	const timestamp = new Date(parseInt(req.params.timestamp))
	const data = await classesController.generateRescheduleClassPatchResponse(
		timestamp,
		classId
	)

	res.status(data.status).json(data)
})

classesRoute.patch("/:classId/move", async (req, res) => {
	const classId = parseInt(req.params.classId)
	const { room_booking_id, new_room_id } = req.body

	const data = await classesController.generateMoveClassRoomPatchResponse(
		classId,
		room_booking_id,
		new_room_id
	)

	res.status(data.status).json(data)
})
