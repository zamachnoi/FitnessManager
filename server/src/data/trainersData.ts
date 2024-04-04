import { db } from "../lib/db"
import { TrainersData, TrainersApiRequest, TrainerDataUpdate, AvailableTrainersData } from "../models/io/trainersIo"
import * as util from "./dataUtil"

export async function getTrainerById(id: number): Promise<TrainersData> {
	const trainer = await db
		.selectFrom("trainers")
		.innerJoin("users", "trainers.trainer_id", "users.user_id")
		.where("trainers.trainer_id", "=", id)
		.selectAll()
		.executeTakeFirst()

	if (!trainer) {
		throw new Error("No such trainer found")
	}

	return util.removePassword(trainer)
}

export async function getTrainerByUsername(
	username: string
): Promise<TrainersData> {
	const trainer = await db
		.selectFrom("trainers")
		.innerJoin("users", "trainers.trainer_id", "users.user_id")
		.where("username", "=", username)
		.selectAll()
		.executeTakeFirst()

	if (!trainer) {
		throw new Error("No such trainer found")
	}

	return util.removePassword(trainer)
}

export async function getAllTrainers(): Promise<TrainersData[]> {
	const trainers = await db
		.selectFrom("trainers")
		.innerJoin("users", "trainers.trainer_id", "users.user_id")
		.selectAll()
		.execute()
	return await Promise.all(trainers.map(util.removePassword))
}

export async function createTrainer(
	trainer: TrainersApiRequest
): Promise<TrainersData> {
	const { start_availability, end_availability, rate, ...userData } = trainer
	// Insert into the users table and get the inserted user
	const user = await db
		.insertInto("users")
		.values(userData)
		.returningAll()
		.executeTakeFirst()

	if (!user) {
		throw new Error("Failed to create user")
	}

	const trainerData = {
		trainer_id: user.user_id,
		start_availability,
		end_availability,
		rate
	}

	// Insert into the trainers table and get the inserted trainer
	const newTrainer = await db
		.insertInto("trainers")
		.values(trainerData)
		.returningAll()
		.executeTakeFirst()

	if (!newTrainer) {
		throw new Error("Failed to create trainer")
	}

	const newTrainerData = {
		...user,
		...newTrainer,
	}

	return util.removePassword(newTrainerData)
}

// // TODO: authorize
// export async function updateTrainer(
// 	trainerId: number,
// 	newData: TrainersApiRequest
// ) {
// 	const { start_availability, end_availability, rate, ...userData } = newData

// 	// Update the user data
// 	const user = await db
// 		.updateTable("users")
// 		.set(userData)
// 		.where("user_id", "=", trainerId)
// 		.returningAll()
// 		.executeTakeFirst()

// 	if (!user) {
// 		throw new Error("Failed to update user")
// 	}

// 	// Update the trainer data
// 	const trainer = await db
// 		.updateTable("trainers")
// 		.set({ start_availability, end_availability, rate })
// 		.where("trainer_id", "=", trainerId)
// 		.returningAll()
// 		.executeTakeFirst()

// 	if (!trainer) {
// 		throw new Error("Failed to update trainer")
// 	}

// 	return util.removePassword({ ...user, ...trainer })
// }
export async function updateTrainer(
	trainerId: number,
	newData: TrainerDataUpdate
) {
	const { trainerData, userData } = newData

	const updateData = await db.transaction().execute(async (trx) => {
		let updatedUser
		let updatedTrainer

		if (Object.values(userData).some((value) => value !== undefined)) {
			updatedUser = await trx
				.updateTable("users")
				.set(userData)
				.where("user_id", "=", trainerId)
				.returningAll()
				.executeTakeFirstOrThrow()
		}

		if (Object.values(trainerData).some((value) => value !== undefined)) {
			updatedTrainer = await trx
				.updateTable("trainers")
				.set(trainerData)
				.where("trainer_id", "=", trainerId)
				.returningAll()
				.executeTakeFirstOrThrow()
		}

		if (!updatedUser) {
			updatedUser = await trx
				.selectFrom("users")
				.where("user_id", "=", trainerId)
				.selectAll()
				.executeTakeFirstOrThrow()
		}

		if (!updatedTrainer) {
			updatedTrainer = await trx
				.selectFrom("trainers")
				.where("trainer_id", "=", trainerId)
				.selectAll()
				.executeTakeFirstOrThrow()
		}

		return { ...updatedUser, ...updatedTrainer }
	})

	return util.removePassword(updateData)
}


export async function getAvailableTrainers(
	timestamp: Date
): Promise<AvailableTrainersData[]> {
	const hourOfInterest = timestamp.getHours()

	const availableTrainers = await db
		.selectFrom("trainers")
		.innerJoin("users", "user_id", "trainer_id")
		.select(["trainer_id", "first_name", "last_name", "rate"])
		.where(({ eb, and, not, exists, selectFrom }) =>
			and([
				eb("start_availability", "<=", `${hourOfInterest}:00:00`),
				eb("end_availability", ">", `${hourOfInterest}:00:00`),
				not(
					exists(
						selectFrom("trainer_booking")
							.where("trainer_booking_timestamp", "=", timestamp)
							.whereRef(
								"trainer_booking.trainer_id",
								"=",
								"trainers.trainer_id"
							)
					)
				),
			])
		)
		.execute()

	if (!availableTrainers) {
		return []
	}

	return availableTrainers
}
