import { db } from "../lib/db"

import {
	EquimentData,
	CreateEquipmentRequest,
	CreateNewEquipmentRequest,
	CreateNewEquipmentAndTypeRequest,
} from "../models/io/equipmentIo"

export async function getAllEquipment(): Promise<EquimentData[]> {
	const equipment = await db
		.selectFrom("equipment")
		.innerJoin(
			"equipment_type",
			"equipment.equipment_type_id",
			"equipment_type.equipment_type_id"
		)
		.select([
			"equipment.equipment_id",
			"equipment.name",
			"equipment.equipment_type_id",
			"equipment_type.name as equipment_type_name",
			"equipment.under_maintenance",
			"equipment.last_maintained",
		])
		.orderBy("equipment_id", "asc")
		.execute()

	return equipment
}

export async function getEquipmentById(
	equipmentId: number
): Promise<EquimentData> {
	const equipment = await db
		.selectFrom("equipment")
		.innerJoin(
			"equipment_type",
			"equipment.equipment_type_id",
			"equipment_type.equipment_type_id"
		)
		.select([
			"equipment.equipment_id",
			"equipment.name",
			"equipment.equipment_type_id",
			"equipment_type.name as equipment_type_name",
			"equipment.under_maintenance",
			"equipment.last_maintained",
		])
		.where("equipment_id", "=", equipmentId)
		.executeTakeFirstOrThrow()

	return equipment
}

async function createEquipmentNoType(
	newEquipment: CreateNewEquipmentRequest
): Promise<EquimentData> {
	const equipment = await db
		.insertInto("equipment")
		.values({
			name: newEquipment.equipment_name,
			equipment_type_id: newEquipment.equipment_type_id,
			last_maintained: new Date(),
			under_maintenance: false,
		})
		.returningAll()
		.executeTakeFirstOrThrow()

	const equipmentData = await getEquipmentById(equipment.equipment_id)

	return equipmentData
}

async function createEquipmentAndType(
	newEquipment: CreateNewEquipmentAndTypeRequest
): Promise<EquimentData> {
	const equipment = await db.transaction().execute(async (trx) => {
		const equipmentType = await trx
			.insertInto("equipment_type")
			.values({ name: newEquipment.equipment_type_name })
			.returningAll()
			.executeTakeFirstOrThrow()

		// if any of the equipment type stuff is undefined or null throw

		const newEquipmentData = await trx
			.insertInto("equipment")
			.values({
				name: newEquipment.equipment_name,
				equipment_type_id: equipmentType.equipment_type_id,
				last_maintained: new Date(),
				under_maintenance: false,
			})
			.returningAll()
			.executeTakeFirstOrThrow()

		return newEquipmentData
	})

	const equipmentData = {
		equipment_id: equipment.equipment_id,
		name: equipment.name,
		equipment_type_id: equipment.equipment_type_id,
		equipment_type_name: newEquipment.equipment_type_name,
		under_maintenance: equipment.under_maintenance,
		last_maintained: equipment.last_maintained,
	}

	return equipmentData
}

export async function createEquipment(
	newEquipment: CreateEquipmentRequest
): Promise<EquimentData> {
	if ("equipment_type_name" in newEquipment) {
		return createEquipmentAndType(newEquipment)
	} else {
		return createEquipmentNoType(newEquipment)
	}
}

export async function startMaintenance(
	equipmentId: number
): Promise<EquimentData> {
	const equipmentData = await getEquipmentById(equipmentId)

	if (equipmentData.under_maintenance) {
		throw new Error("Equipment is already under maintenance")
	}

	const equipment = await db
		.updateTable("equipment")
		.set({ under_maintenance: true })
		.where("equipment_id", "=", equipmentId)
		.returningAll()
		.executeTakeFirstOrThrow()

	equipmentData.under_maintenance = true

	return equipmentData
}

export async function endMaintenance(
	equipmentId: number
): Promise<EquimentData> {
	const equipmentData = await getEquipmentById(equipmentId)

	if (!equipmentData.under_maintenance) {
		throw new Error("Equipment is not under maintenance")
	}

	const equipment = await db
		.updateTable("equipment")
		.set({ under_maintenance: false, last_maintained: new Date() })
		.where("equipment_id", "=", equipmentId)
		.returningAll()
		.executeTakeFirstOrThrow()

	equipmentData.under_maintenance = false
	equipmentData.last_maintained = equipment.last_maintained

	return equipmentData
}
