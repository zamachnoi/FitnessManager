import { db } from "../lib/db"
import {
	ClassesData,
	ClassesApiRequest,
} from "../models/io/classesIo"

export async function getAllClasses(
): Promise<ClassesData[]> {
	const classes = await db
		.selectFrom("classes")
		.selectAll()
		.execute()

	return classes
}

export async function getClassByClassId(
	classId: number,
): Promise<ClassesData> {
    //classe spelt this way to indicate singular class for semanitics
	const classe = await db
		.selectFrom("classes")
		.where("class_id", "=", classId)
		.selectAll()
		.executeTakeFirst()

	if (!classe) {
		throw new Error("No such class found")
	}

	return classe
}

export async function getClassesByTimeslotId(
	timeSlotAvailabilityId: number,
): Promise<ClassesData[]> {
	const classes = await db
		.selectFrom("classes")
		.where("timeslot_availability_id", "=", timeSlotAvailabilityId)
		.selectAll()
		.execute()

	if (!classes) {
		throw new Error("No such classes found")
	}

	return classes
}

export async function createClass(
	classId: number,
	stats: ClassesApiRequest
): Promise<ClassesData> {
	const { name, price, room_id, trainer_id, timeslot_availability_id } = stats
    //classe spelt this way to indicate singular class for semanitics
	const classe = await db
		.insertInto("classes")
		.values({
			class_id: classId,
			name,
			price,
			room_id,
			trainer_id,
            timeslot_availability_id
		})
		.returningAll()
		.executeTakeFirst()

	if (!classe) {
		throw new Error("Failed to create class")
	}

	return classe
}
