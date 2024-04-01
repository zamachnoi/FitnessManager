import {
	ClassesApiRequest,
	ClassesApiResponse,
	ClassesArrayApiResponse,
} from "../models/io/classesIo"

import * as classesData from "../data/classesData"

// GET
export async function generateClassesGetResponse(
): Promise<ClassesArrayApiResponse> {
	try {
		const classes =
			await classesData.getAllClasses()
		let res: ClassesArrayApiResponse = {
			message: `success`,
			status: 200,
			data: classes,
		}
		return res
	} catch (e) {
		return {
			message: "Could not find classes",
			status: 404,
			data: [],
		}
	}
}

export async function generateClassesGetByIdResponse(
	class_id: number,
): Promise<ClassesApiResponse> {
	try {
		const classes =
			await classesData.getClassByClassId(
				class_id,
			)
		let res: ClassesApiResponse = {
			message: `success`,
			status: 200,
			data: classes,
		}
		return res
	} catch (e) {
		return {
			message: "Could not find class",
			status: 404,
			data: null,
		}
	}
}

// POST
export async function generateClassesPostResponse(
	class_id: number,
	stats: ClassesApiRequest
): Promise<ClassesApiResponse> {
	try {
		const classes =
			await classesData.createClass(
				class_id,
				stats
			)
		let res: ClassesApiResponse = {
			message: `success`,
			status: 200,
			data: classes,
		}
		return res
	} catch (e) {
		return {
			message: "Could not create member health stats",
			status: 404,
			data: null,
		}
	}
}
