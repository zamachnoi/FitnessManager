import { ApiResponse } from "./util"
import { ExerciseRoutines, Exercises } from "../db/types"
import { ExerciseData } from "./exerciseIo"

export type RoutineDbData = {
	routine_id: number
	routine_name: string | null
	exercise_id: number | null
	exercise_name: string | null
	exercise_type: string | null
	exercise_description: string | null
	equipment_type_id: number | null
	equipment_name: string | null
}

export type RoutineData = {
	routine_id: number
	routine_name: string
	exercises: ExerciseData[]
}

export type RoutineCreateRequest = {
	routine_name: string
	exercises: number[]
}

export type AssignRoutineRequest = {
	member_id: number
	routine_id: number
}

export type UnassignRoutineRequest = {
	member_id: number
	routine_id: number
}

export type RoutineApiResponse = {
	status: number
	message: string
	data: RoutineData | null
}

export type RoutinesApiResponse = {
	status: number
	message: string
	data: RoutineData[] | null
}
