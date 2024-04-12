import {
	getAllEquipment,
	getEquipmentById,
	createEquipment,
	startMaintenance,
	endMaintenance,
	getAllEquipmentTypes,
} from "../data/equipmentData"

import {
	EquipmentResponse,
	EquipmentArrayResponse,
	CreateEquipmentRequest,
	EquipmentTypeArrayResponse,
} from "../models/io/equipmentIo"

export async function generateGetAllEquipmentGetResponse(): Promise<EquipmentArrayResponse> {
	try {
		const equipment = await getAllEquipment()
		if (!equipment) {
			throw new Error("No equipment found")
		}
		return {
			message: "success",
			status: 200,
			data: equipment,
		}
	} catch (e) {
		return {
			message: "Could not find equipment",
			status: 404,
			data: null,
		}
	}
}

export async function generateEquipmentByIdGetResponse(
	equipmentId: number
): Promise<EquipmentResponse> {
	try {
		const equipment = await getEquipmentById(equipmentId)

		return {
			message: "success",
			status: 200,
			data: equipment,
		}
	} catch (e) {
		return {
			message: "Could not find equipment",
			status: 404,
			data: null,
		}
	}
}

export async function generateEquipmentPostResponse(
	equipment: CreateEquipmentRequest
): Promise<EquipmentResponse> {
	try {
		const newEquipment = await createEquipment(equipment)
		return {
			message: "success",
			status: 200,
			data: newEquipment,
		}
	} catch (e) {
		return {
			message: "Could not create equipment",
			status: 404,
			data: null,
		}
	}
}

export async function generateStartMaintenancePatchResponse(
	equipmentId: number
): Promise<EquipmentResponse> {
	try {
		const equipment = await startMaintenance(equipmentId)
		return {
			message: "success",
			status: 200,
			data: equipment,
		}
	} catch (e) {
		return {
			message: "Could not start maintenance",
			status: 404,
			data: null,
		}
	}
}

export async function generateEndMaintenancePatchResponse(
	equipmentId: number
): Promise<EquipmentResponse> {
	try {
		const equipment = await endMaintenance(equipmentId)
		return {
			message: "success",
			status: 200,
			data: equipment,
		}
	} catch (e) {
		return {
			message: "Could not end maintenance",
			status: 404,
			data: null,
		}
	}
}

export async function generateGetAllEquipmentTypesResponse(): Promise<EquipmentTypeArrayResponse> {
	const equipmentTypes = await getAllEquipmentTypes()

	try {
		return {
			message: "success",
			status: 200,
			data: equipmentTypes,
		}
	} catch (e) {
		console.log(e)
		return {
			message: "Could not find equipment types",
			status: 404,
			data: null,
		}
	}
}
