import { Classes, TrainerBooking } from "../db/types"

export type ClassesData = Omit<Classes, "class_id" | "class_time"> & {
	class_id: number
	class_time: Date | null
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