import {
	getExerciseByExerciseId,
	getAllExerciseData,
	createExercise,
} from "../data/exerciseData"
import {
	CreateExerciseRequest,
	ExerciseArrayResponse,
	ExerciseResponse,
} from "../models/io/exerciseIo"

export async function generateExerciseByIdGetResponse(
	exerciseId: number
): Promise<ExerciseResponse> {
	try {
		const exercise = await getExerciseByExerciseId(exerciseId)

		return {
			message: "success",
			status: 200,
			data: exercise,
		}
	} catch (e) {
		return {
			message: "Could not find exercise",
			status: 404,
			data: null,
		}
	}
}

export async function generateExercisesGetResponse(): Promise<ExerciseArrayResponse> {
	try {
		const exercises = await getAllExerciseData()
		if (!exercises) {
			throw new Error("No exercises found")
		}
		return {
			message: "success",
			status: 200,
			data: exercises,
		}
	} catch (e) {
		return {
			message: "Could not find exercises",
			status: 404,
			data: null,
		}
	}
}

export async function generateExercisePostResponse(
	exercise: CreateExerciseRequest
): Promise<ExerciseResponse> {
	try {
		const newExercise = await createExercise(exercise)
		return {
			message: "success",
			status: 200,
			data: newExercise,
		}
	} catch (e) {
		return {
			message: "Could not create exercise",
			status: 404,
			data: null,
		}
	}
}
