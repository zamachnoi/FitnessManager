import { Classes } from "../db/types"



export type ClassesData = Omit<
	Classes,
	"class_id"
> & {
	class_id: number
}

export type ClassesApiRequest = {
	name: string
	price: number
	room_id: number
    trainer_id: number
    timeslot_availability_id: number
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
