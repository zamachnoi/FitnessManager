import { Users, Trainers } from "../db/types"

export type TrainersData = Omit<Users, "user_id" | "password"> & Trainers

export type TrainersApiRequest =    Omit<Users, "user_id" | "type"> &
                                    Trainers & { type: "Trainer" }

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

export type TrainerDataUpdate = {
	trainerData: {
		start_availability?: string | null
		end_availability?: string | null
		rate?: number | null
	}
	userData: {
		first_name?: string | null
		last_name?: string | null
		username?: string | null
		password?: string | null
	}
}

export type TrainerDataUpdateRequest = {
	start_availability?: string | null
	end_availability?: string | null
	rate?: number | null
	first_name?: string | null
	last_name?: string | null
	username?: string | null
	password?: string | null
}