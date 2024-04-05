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


// AvailableTrainers
export type AvailableTrainersData = {
	trainer_id: number
	first_name: string | null
	last_name: string | null
	rate: number | null
}

export type AvailableTrainersRequest = {
	booking_timestamp: Date
}

export type AvailableTrainersResponse = {
	status: number
	message: string
	data: AvailableTrainersData[]
}

export type TrainerBookingData = {
	trainer_bookings: {
		trainer_id: number | null
		first_name: string | null
		last_name: string | null
		rate: number | null
		booking_timestamp: Date | null
		member_booking_id: number | null
		trainer_booking_id: number | null
	}[]
	class_bookings: {
		trainer_id: number | null
		name: string | null
		price: number | null
		room_number: number | null
		class_time: Date | null
	}[]
	
}

export type TrainerBookingsResponse = {
	status: number
	message: string
	data: TrainerBookingData | null
}