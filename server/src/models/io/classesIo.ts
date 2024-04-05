import { Classes, TrainerBooking } from "../db/types"

export type ClassesData = Omit<Classes, "class_id" | "class_time"> & {
	class_id: number
	class_time: Date | null
	room_booking_id?: number | null
}

export type BookableClassesData = ClassesData & {
	first_name: string | null
	last_name: string | null
	room_number: number | null
}

export type BookableClassessApiResponse = {
	message: string
	status: number
	data: BookableClassesData[] | null
}

export type ClassesApiRequest = {
	name: string
	price: number
	room_id: number
	trainer_id: number
	timeslot: Date
}

export type ClassesApiResponse = {
	message: string
	status: number
	data: ClassesData | null
}

export type ClassesArrayApiResponse = {
	message: string
	status: number
	data: ClassesData[] | null
}

export type MoveClassRequest = {
	new_room_id: number
}
