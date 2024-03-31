import { db } from "../lib/db"
import { TrainersData, TrainersApiRequest } from "../models/io/trainersIo"
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
	const { rate, ...userData } = trainer
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
		rate,
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

// TODO: authorize
export async function updateTrainer(
	trainerId: number,
	newData: TrainersApiRequest
) {
	const { rate, ...userData } = newData

	// Update the user data
	const user = await db
		.updateTable("users")
		.set(userData)
		.where("user_id", "=", trainerId)
		.returningAll()
		.executeTakeFirst()

	if (!user) {
		throw new Error("Failed to update user")
	}

	// Update the trainer data
	const trainer = await db
		.updateTable("trainers")
		.set({ rate })
		.where("trainer_id", "=", trainerId)
		.returningAll()
		.executeTakeFirst()

	if (!trainer) {
		throw new Error("Failed to update trainer")
	}

	return util.removePassword({ ...user, ...trainer })
}
