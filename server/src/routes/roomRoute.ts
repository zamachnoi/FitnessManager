import { Router } from "express"
import * as roomController from "../controllers/roomController"

export const roomRoute = Router()

roomRoute.get("/", async (req, res) => {
	const data = await roomController.generateRoomsGetResponse()
	res.status(data.status).json(data)
})

roomRoute.get("/:roomId", async (req, res) => {
	const roomId = parseInt(req.params.roomId)
	const data = await roomController.generateRoomByIdGetResponse(roomId)
	res.status(data.status).json(data)
})
