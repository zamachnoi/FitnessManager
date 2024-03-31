import { Users, Trainers } from "../db/types"

export type TrainersData = Omit<Users, "user_id" | "password"> & Trainers

export type TrainersApiRequest =    Omit<Users, "user_id" | "type"> &
                                    Omit<Trainers, "trainer_id"> & 
                                    { type: "Trainer" }

export type TrainersApiResponse = {
	message: string
	status: number
	data: TrainersData | null
}

export type TrainersArrayApiResponse = {
	message: string
	status: number
	data: TrainersData[] | null
}