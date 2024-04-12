import * as equipmentController from "../controllers/equipmentController"
import { CreateEquipmentRequest } from "../models/io/equipmentIo"
import { Router } from "express"

export const equipmentRoute = Router()

equipmentRoute.get("/equipment", async (req, res) => {
	const response =
		await equipmentController.generateGetAllEquipmentGetResponse()
	res.status(response.status).send(response)
})

equipmentRoute.get("/equipment/:equipmentId", async (req, res) => {
	const response = await equipmentController.generateEquipmentByIdGetResponse(
		parseInt(req.params.equipmentId)
	)
	res.status(response.status).send(response)
})

equipmentRoute.post("/admin/equipment", async (req, res) => {
	const response = await equipmentController.generateEquipmentPostResponse(
		req.body as CreateEquipmentRequest
	)
	res.status(response.status).send(response)
})

equipmentRoute.patch(
	"/admin/equipment/:equipmentId/startMaintenance",
	async (req, res) => {
		const response =
			await equipmentController.generateStartMaintenancePatchResponse(
				parseInt(req.params.equipmentId)
			)
		res.status(response.status).send(response)
	}
)

equipmentRoute.patch(
	"/admin/equipment/:equipmentId/endMaintenance",
	async (req, res) => {
		const response =
			await equipmentController.generateEndMaintenancePatchResponse(
				parseInt(req.params.equipmentId)
			)
		res.status(response.status).send(response)
	}
)

equipmentRoute.get("/equipmenttypes", async (req, res) => {
	const response =
		await equipmentController.generateGetAllEquipmentTypesResponse()
	res.status(response.status).send(response)
})
