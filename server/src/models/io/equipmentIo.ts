import { EquipmentType } from "../db/types"

export type EquimentTypeData = Omit<EquipmentType, "equipment_type_id"> & {
	equipment_type_id: number
}

export type EquimentData = {
	equipment_id: number
	name: string | null
	equipment_type_id: number | null
	equipment_type_name: string | null
	under_maintenance: boolean | null
	last_maintained: Date | null
}

export type EquipmentResponse = {
	status: number
	message: string
	data: EquimentData | null
}

export type EquipmentArrayResponse = {
	status: number
	message: string
	data: EquimentData[] | null
}

export type CreateNewEquipmentRequest = {
	equipment_name: string
	equipment_type_id: number
}

export type CreateNewEquipmentAndTypeRequest = {
	equipment_name: string
	equipment_type_name: string
}

export type CreateEquipmentRequest =
	| CreateNewEquipmentAndTypeRequest
	| CreateNewEquipmentRequest

export type EquipmentTypeArrayResponse = {
	status: number
	message: string
	data: EquimentTypeData[] | null
}
