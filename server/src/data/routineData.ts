import { db } from "../lib/db"
import {
	RoutineDbData,
	RoutineCreateRequest,
	AssignRoutineRequest,
} from "../models/io/routinesIo"
import * as routineData from "./routineData"

export async function getAllRoutines(): Promise<RoutineDbData[]> {
	const routines = await db
		.selectFrom("exercise_routines")
		.innerJoin(
			"routine_exercises",
			"exercise_routines.routine_id",
			"routine_exercises.routine_id"
		)
		.innerJoin(
			"exercises",
			"routine_exercises.exercise_id",
			"exercises.exercise_id"
		)
		.innerJoin(
			"equipment_type",
			"exercises.equipment_type_id",
			"equipment_type.equipment_type_id"
		)
		.select([
			"exercise_routines.routine_id as routine_id",
			"exercise_routines.name as routine_name",
			"exercises.exercise_id as exercise_id",
			"exercises.name as exercise_name",
			"exercises.type as exercise_type",
			"exercises.description as exercise_description",
			"equipment_type.equipment_type_id as equipment_type_id",
			"equipment_type.name as equipment_name",
		])
		.execute()

	return routines
}

export async function getRoutinesByMemberId(
	memberId: number
): Promise<RoutineDbData[]> {
	const memberRoutines = await db
		.selectFrom("member_exercise_routines")
		.where("member_id", "=", memberId)
		.innerJoin(
			"exercise_routines",
			"member_exercise_routines.routine_id",
			"exercise_routines.routine_id"
		)
		.innerJoin(
			"routine_exercises",
			"exercise_routines.routine_id",
			"routine_exercises.routine_id"
		)
		.innerJoin(
			"exercises",
			"routine_exercises.exercise_id",
			"exercises.exercise_id"
		)
		.innerJoin(
			"equipment_type",
			"exercises.equipment_type_id",
			"equipment_type.equipment_type_id"
		)
		.select([
			"exercise_routines.routine_id as routine_id",
			"exercise_routines.name as routine_name",
			"exercises.exercise_id as exercise_id",
			"exercises.name as exercise_name",
			"exercises.type as exercise_type",
			"exercises.description as exercise_description",
			"equipment_type.equipment_type_id as equipment_type_id",
			"equipment_type.name as equipment_name",
		])
		.execute()

	return memberRoutines
}

export async function getRoutineByRoutineId(
	routineId: number
): Promise<RoutineDbData[]> {
	const routine = await db
		.selectFrom("exercise_routines")
		.where("exercise_routines.routine_id", "=", routineId)
		.innerJoin(
			"routine_exercises",
			"exercise_routines.routine_id",
			"routine_exercises.routine_id"
		)
		.innerJoin(
			"exercises",
			"routine_exercises.exercise_id",
			"exercises.exercise_id"
		)
		.innerJoin(
			"equipment_type",
			"exercises.equipment_type_id",
			"equipment_type.equipment_type_id"
		)
		.select([
			"exercise_routines.routine_id as routine_id",
			"exercise_routines.name as routine_name",
			"exercises.exercise_id as exercise_id",
			"exercises.name as exercise_name",
			"exercises.type as exercise_type",
			"exercises.description as exercise_description",
			"equipment_type.equipment_type_id as equipment_type_id",
			"equipment_type.name as equipment_name",
		])
		.execute()

	return routine
}

export async function createRoutine(
	routine: RoutineCreateRequest
): Promise<RoutineDbData[]> {
	const { routine_name, exercises } = routine

	const newRoutine = await db.transaction().execute(async (trx) => {
		const createdRoutine = await trx
			.insertInto("exercise_routines")
			.values({ name: routine_name })
			.returningAll()
			.executeTakeFirstOrThrow()

		const routineExercises = exercises.map((exercise_id) => ({
			routine_id: createdRoutine.routine_id,
			exercise_id,
		}))

		await trx
			.insertInto("routine_exercises")
			.values(routineExercises)
			.execute()

		return createdRoutine
	})
	const routineData = await getRoutineByRoutineId(newRoutine.routine_id)
	return routineData
}

export async function assignRoutineToMember(
	assignRequest: AssignRoutineRequest
): Promise<RoutineDbData[]> {
	const { member_id, routine_id } = assignRequest

	const memberRoutine = await db
		.insertInto("member_exercise_routines")
		.values({ member_id, routine_id })
		.returningAll()
		.executeTakeFirstOrThrow()

	const routine = await getRoutineByRoutineId(routine_id)

	return routine
}

export async function unassignRoutineFromMember(
	unassignRequest: AssignRoutineRequest
): Promise<RoutineDbData[]> {
	const { member_id, routine_id } = unassignRequest

	const memberRoutine = await db
		.deleteFrom("member_exercise_routines")
		.where("member_id", "=", member_id)
		.where("routine_id", "=", routine_id)
		.returningAll()
		.executeTakeFirstOrThrow()

	const routine = await getRoutineByRoutineId(routine_id)

	return routine
}
