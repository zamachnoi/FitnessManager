import * as routineData from "../data/routineData"
import {
	RoutineApiResponse,
	RoutinesApiResponse,
	RoutineData,
	RoutineDbData,
	AssignRoutineRequest,
	RoutineCreateRequest,
} from "../models/io/routinesIo"

export async function generateRoutineByIdGetResponse(
	id: number
): Promise<RoutineApiResponse> {
	try {
		const routine = await routineData.getRoutineByRoutineId(id)
		const transformed = transformRoutineDbData(routine)
		console.log(transformed)

		let res: RoutineApiResponse = {
			message: `success`,
			status: 200,
			data: transformed[0],
		}
		return res
	} catch (e) {
		console.log(e)
		return { message: "Could not find routine", status: 404, data: null }
	}
}

export async function generateRoutinesGetResponse(): Promise<RoutinesApiResponse> {
	try {
		const routines = await routineData.getAllRoutines()
		const transformed = transformRoutineDbData(routines)

		let res = {
			message: `success`,
			status: 200,
			data: transformed,
		}
		return res
	} catch (e) {
		return { message: "Could not find routines", status: 404, data: null }
	}
}

export async function generateRoutinesByMemberIdGetResponse(
	memberId: number
): Promise<RoutinesApiResponse> {
	try {
		const routines = await routineData.getRoutinesByMemberId(memberId)
		const transformed = transformRoutineDbData(routines)

		let res = {
			message: `success`,
			status: 200,
			data: transformed,
		}
		return res
	} catch (e) {
		return { message: "Could not find routines", status: 404, data: null }
	}
}

export async function generateAssignRoutineToMemberPatchResponse(
	assignRequest: AssignRoutineRequest
): Promise<RoutineApiResponse> {
	try {
		const routine = await routineData.assignRoutineToMember(assignRequest)
		const transformed = transformRoutineDbData(routine)

		let res = {
			message: `success`,
			status: 200,
			data: transformed[0],
		}
		return res
	} catch (e) {
		return { message: "Could not assign routine", status: 404, data: null }
	}
}

export async function generateUnassignRoutineFromMemberPatchResponse(
	unassignRequest: AssignRoutineRequest
): Promise<RoutineApiResponse> {
	try {
		const routine = await routineData.unassignRoutineFromMember(
			unassignRequest
		)
		const transformed = transformRoutineDbData(routine)

		let res = {
			message: `success`,
			status: 200,
			data: transformed[0],
		}
		return res
	} catch (e) {
		return {
			message: "Could not unassign routine",
			status: 404,
			data: null,
		}
	}
}

export async function generateCreateRoutinePostResponse(
	createRequest: RoutineCreateRequest
): Promise<RoutineApiResponse> {
	try {
		const routine = await routineData.createRoutine(createRequest)
		const transformed = transformRoutineDbData(routine)

		let res = {
			message: `success`,
			status: 200,
			data: transformed[0],
		}
		return res
	} catch (e) {
		console.log(e)
		return {
			message: "Could not create routine",
			status: 404,
			data: null,
		}
	}
}

export function transformRoutineDbData(
	routineDbData: RoutineDbData[]
): RoutineData[] {
	return routineDbData.reduce((acc: RoutineData[], curr: RoutineDbData) => {
		const existingRoutine = acc.find(
			(routine) => routine.routine_id === curr.routine_id
		)

		if (existingRoutine) {
			if (
				curr.exercise_id &&
				curr.exercise_name &&
				curr.exercise_type &&
				curr.exercise_description
			) {
				existingRoutine.exercises.push({
					exercise_id: curr.exercise_id,
					exercise_name: curr.exercise_name,
					exercise_type: curr.exercise_type,
					exercise_description: curr.exercise_description,
					equipment_type_id: curr.equipment_type_id,
					equipment_name: curr.equipment_name,
				})
			}
		} else {
			acc.push({
				routine_id: curr.routine_id,
				routine_name: curr.routine_name || "",
				exercises:
					curr.exercise_id &&
					curr.exercise_name &&
					curr.exercise_type &&
					curr.exercise_description
						? [
								{
									exercise_id: curr.exercise_id,
									exercise_name: curr.exercise_name,
									exercise_type: curr.exercise_type,
									exercise_description:
										curr.exercise_description,
									equipment_type_id: curr.equipment_type_id,
									equipment_name: curr.equipment_name,
								},
						  ]
						: [],
			})
		}

		return acc
	}, [])
}
