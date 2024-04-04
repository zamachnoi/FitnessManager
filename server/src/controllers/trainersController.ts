import {
	TrainersArrayApiResponse,
	TrainersApiResponse,
	TrainersApiRequest,
	TrainerDataUpdateRequest,
	TrainerDataUpdate,
	AvailableTrainersRequest,
	AvailableTrainersResponse,
} from "../models/io/trainersIo"
import {
	getTrainerById,
	getTrainerByUsername,
	getAllTrainers,
	createTrainer,
	updateTrainer,
	getAvailableTrainers,
} from "../data/trainersData"



export async function generateTrainerByIdGetResponse(
	id: number
): Promise<TrainersApiResponse> {
	try {
		const trainer = await getTrainerById(id)
		let res: TrainersApiResponse = {
			message: `success`,
			status: 200,
			data: trainer,
		}
		return res
	} catch (e) {
		return { message: "Could not find trainer", status: 404, data: null }
	}
}

export async function generateTrainerByUsernameGetResponse(
	username: string
): Promise<TrainersApiResponse> {
	try {
		const trainer = await getTrainerByUsername(username)
		let res: TrainersApiResponse = {
			message: `success`,
			status: 200,
			data: trainer,
		}
		return res
	} catch (e) {
		return { message: "Could not find trainer", status: 404, data: null }
	}
}

export async function generateAllTrainersGetResponse(): Promise<TrainersArrayApiResponse> {
	try {
		const trainers = await getAllTrainers()
		let res: TrainersArrayApiResponse = {
			message: `success getting all trainers`,
			status: 200,
			data: trainers,
		}
		return res
	} catch (e) {
		return { message: "Could not find trainers", status: 404, data: [] }
	}
}

export async function generateTrainerPostResponse(
	trainer: TrainersApiRequest
): Promise<TrainersApiResponse> {
	try {
		const newTrainer = await createTrainer(trainer)
		let res: TrainersApiResponse = {
			message: `success`,
			status: 200,
			data: newTrainer,
		}
		return res
	} catch (e) {
		console.log(e)
		return { message: "Could not create trainer", status: 404, data: null }
	}
}

export async function generateTrainerPatchResponse(
	trainerId: number,
	trainer: TrainersApiRequest
) {
	try {
		const trainerUpdate = transformUpdateRequest(trainer)
		const updatedTrainer = await updateTrainer(trainerId, trainerUpdate)

		let res: TrainersApiResponse = {
			message: `success`,
			status: 200,
			data: updatedTrainer,
		}
		return res
	} catch (e: any) {
		console.log(e.message)
		return { message: "Could not update trainer" + e, status: 404, data: null }
	}
}


function transformUpdateRequest(
	member: TrainerDataUpdateRequest
): TrainerDataUpdate {
	return {
		trainerData: {
			start_availability: member.start_availability,
			end_availability: member.end_availability,
			rate: member.rate,
		},
		userData: {
			first_name: member.first_name,
			last_name: member.last_name,
			username: member.username,
			password: member.password,
		},
	}
}


export async function generateAvailableTrainersGetResponse(
	request: AvailableTrainersRequest
): Promise<AvailableTrainersResponse> {
	const timestamp = new Date(request.booking_timestamp)

	try {
		const trainers = await getAvailableTrainers(
			timestamp
		)

		return {
			message: `success`,
			status: 200,
			data: trainers,
		}
	} catch (e) {
		return {
			message: "Could not find available trainers",
			status: 404,
			data: [],
		}
	}
}
