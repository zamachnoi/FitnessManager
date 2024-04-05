import e from "express"
import { db } from "../lib/db"
import { CreateExerciseRequest, ExerciseData } from "../models/io/exerciseIo"

export async function getAllExerciseData(): Promise<ExerciseData[]> {
	const exercsies = await db
		.selectFrom("exercises")
		.innerJoin(
			"equipment_type",
			"exercises.equipment_type_id",
			"equipment_type.equipment_type_id"
		)
		.select([
			"exercise_id",
			"exercises.name as exercise_name",
			"exercises.type as exercise_type",
			"description as exercise_description",
			"equipment_type.equipment_type_id",
			"equipment_type.name as equipment_name",
		])
		.execute()
	return exercsies
}

export async function getExerciseByExerciseId(
	exerciseId: number
): Promise<ExerciseData> {
	const exercsies = await db
		.selectFrom("exercises")
		.innerJoin(
			"equipment_type",
			"exercises.equipment_type_id",
			"equipment_type.equipment_type_id"
		)
		.select([
			"exercise_id",
			"exercises.name as exercise_name",
			"exercises.type as exercise_type",
			"description as exercise_description",
			"equipment_type.equipment_type_id",
			"equipment_type.name as equipment_name",
		])
		.where("exercise_id", "=", exerciseId)
		.executeTakeFirstOrThrow()
	return exercsies
}

export async function createExercise(
	exercise: CreateExerciseRequest
): Promise<ExerciseData> {
	const equipmentType = await db
		.selectFrom("equipment_type")
		.where("equipment_type_id", "=", exercise.equipment_type_id)
		.selectAll()
		.executeTakeFirstOrThrow()

	const newExercise = await db
		.insertInto("exercises")
		.values(exercise)
		.returningAll()
		.executeTakeFirstOrThrow()

	const exerciseData = {
		exercise_id: newExercise.exercise_id,
		exercise_name: newExercise.name,
		exercise_type: newExercise.type,
		exercise_description: newExercise.description,
		equipment_type_id: equipmentType.equipment_type_id,
		equipment_name: equipmentType.name,
	}

	return exerciseData
}
