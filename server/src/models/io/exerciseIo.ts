export type ExerciseData = {
	exercise_id: number | null
	exercise_name: string | null
	exercise_type: string | null
	exercise_description: string | null
	equipment_type_id: number | null
	equipment_name: string | null
}

export type ExerciseResponse = {
	status: number
	message: string
	data: ExerciseData | null
}

export type ExerciseArrayResponse = {
	status: number
	message: string
	data: ExerciseData[] | null
}

export type CreateExerciseRequest = {
	name: string
	type: string
	description: string
	equipment_type_id: number
}
