import {
	BookableClassessApiResponse,
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

export async function generateBookableClassesGetResponse(
	memberId: number
): Promise<BookableClassessApiResponse> {
	try {
		const classes =
			await classesData.getBookableClasses(memberId)
		let res: BookableClassessApiResponse = {
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

// POST
export async function generateClassesPostResponse(
	classRequest: ClassesApiRequest
): Promise<ClassesApiResponse> {
	try {
		const timeslot = new Date(classRequest.timeslot)

		const createClassData = classRequest

		createClassData.timeslot = timeslot

		const classes =
			await classesData.createClass(
				classRequest
			)
		let res: ClassesApiResponse = {
			message: `success`,
			status: 200,
			data: classes,
		}
		return res
	} catch (e) {
		console.log(e)
		return {
			message: "Could not create class",
			status: 404,
			data: null,
		}
	}
}

