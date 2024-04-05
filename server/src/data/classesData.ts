import { db } from "../lib/db"
import { sql } from "kysely"
import {
	ClassesData,
	ClassesApiRequest,
	BookableClassesData,
} from "../models/io/classesIo"
import { RoomAndBookingData } from "../models/io/roomIo"
import { getAvailableRooms } from "./roomData"

export async function getAllClasses(): Promise<BookableClassesData[]> {
	const classes = await db
		.selectFrom("classes")
		.innerJoin("users", "users.user_id", "classes.trainer_id")
		.innerJoin("rooms", "rooms.room_id", "classes.room_id")
		.innerJoin(
			"room_bookings",
			"room_bookings.class_id",
			"classes.class_id"
		)
		.select([
			"classes.trainer_id",
			"classes.class_id",
			"classes.name",
			"classes.price",
			"classes.class_time",
			"users.first_name",
			"users.last_name",
			"rooms.room_number",
			"rooms.room_id",
			"classes.trainer_booking_id",
			"room_bookings.booking_id as room_booking_id",
		])
		.execute()
	return classes
}

export async function getClassByClassId(classId: number): Promise<ClassesData> {
	//classe spelt this way to indicate singular class for semanitics
	const classe = await db
		.selectFrom("classes")
		.innerJoin("users", "users.user_id", "classes.trainer_id")
		.innerJoin("rooms", "rooms.room_id", "classes.room_id")
		.innerJoin(
			"room_bookings",
			"room_bookings.class_id",
			"classes.class_id"
		)
		.where("room_bookings.class_id", "=", classId)
		.select([
			"classes.trainer_id",
			"classes.class_id",
			"classes.name",
			"classes.price",
			"classes.class_time",
			"users.first_name",
			"users.last_name",
			"rooms.room_number",
			"rooms.room_id",
			"classes.trainer_booking_id",
			"room_bookings.booking_id as room_booking_id",
		])
		.executeTakeFirst()

	if (!classe) {
		throw new Error("No such class found")
	}

	return classe
}

export async function createClass(
	classRequest: ClassesApiRequest
): Promise<ClassesData> {
	const { name, price, room_id, trainer_id, timeslot } = classRequest
	const class_time = timeslot

	const availableTrainers = await getAvailableTrainers(timeslot)

	if (!availableTrainers.includes(trainer_id)) {
		throw new Error("Trainer is not available")
	}

	const roomAvailable = await getRoomAvailable(timeslot)

	if (!roomAvailable) {
		throw new Error("Room is not available")
	}

	//Pre check if existing room booking

	//classe spelt this way to indicate singular class for semanitics
	const classe = await db.transaction().execute(async (transaction) => {
		//trainer is available
		const trainerBooking = await transaction
			.insertInto("trainer_booking")
			.values({
				trainer_id,
				trainer_booking_timestamp: timeslot,
			})
			.returningAll()
			.executeTakeFirstOrThrow()

		const classCreationData = {
			name,
			price,
			room_id,
			trainer_id,
			trainer_booking_id: trainerBooking.trainer_booking_id,
			class_time,
		}
		const classes = await transaction
			.insertInto("classes")
			.values(classCreationData)
			.returningAll()
			.executeTakeFirstOrThrow()

		const classId = classes.class_id

		const roomBookingId = await transaction
			.insertInto("room_bookings")
			.values({
				room_id: room_id,
				class_time: timeslot,
				class_id: classId,
			})
			.returningAll()
			.executeTakeFirstOrThrow()
		return classes
	})

	const roomBookingId = await db
		.selectFrom("room_bookings")
		.select("booking_id as room_booking_id")
		.where("class_id", "=", classe.class_id)
		.executeTakeFirstOrThrow()

	const data = {
		...classe,
		room_booking_id: roomBookingId.room_booking_id,
	}
	return data
}

export async function getAvailableTrainers(timestamp: Date): Promise<number[]> {
	const hourOfInterest = timestamp.getHours()

	const availableTrainers = await db
		.selectFrom("trainers")
		.select("trainer_id")
		.where(({ eb, and, not, exists, selectFrom }) =>
			and([
				eb("start_availability", "<=", `${hourOfInterest}:00:00`),
				eb("end_availability", ">", `${hourOfInterest}:00:00`),
				not(
					exists(
						selectFrom("trainer_booking")
							.where("trainer_booking_timestamp", "=", timestamp)
							.whereRef(
								"trainer_booking.trainer_id",
								"=",
								"trainers.trainer_id"
							)
					)
				),
			])
		)
		.execute()

	if (!availableTrainers) {
		return []
	}

	return availableTrainers.map((trainer) => trainer.trainer_id)
}

export async function getMemberAvailableHours(memberId: number, date: string) {
	const availableTimes = Array.from({ length: 24 }, (_, i) => i)

	console.log(date)
	const memberBookings = await db
		.selectFrom("member_bookings")
		.select(
			sql<string>`EXTRACT(HOUR FROM booking_timestamp AT TIME ZONE \'America/New_York\')`.as(
				"hour"
			)
		)
		.where("member_id", "=", memberId)
		.where(db.fn("DATE", ["booking_timestamp"]), "=", date)
		.execute()

	if (!memberBookings) {
		return availableTimes
	}

	const bookedTimes = memberBookings.map((booking) => parseInt(booking.hour))
	console.log(bookedTimes)

	const availableTimesFiltered = availableTimes.filter(
		(time) => !bookedTimes.includes(time)
	)

	return availableTimesFiltered
}

async function getRoomAvailable(timestamp: Date) {
	const roomBooked = await db
		.selectFrom("room_bookings")
		.selectAll()
		.where("class_time", "=", timestamp)
		.executeTakeFirst()

	if (roomBooked) {
		return false
	}
	return true
}

export async function getBookableClasses(
	memberId: number
): Promise<BookableClassesData[]> {
	const classes = await db
		.selectFrom("classes")
		.where(({ not, exists, selectFrom }) =>
			not(
				exists(
					selectFrom("member_bookings")
						.where("member_id", "=", memberId)
						.whereRef(
							"member_bookings.booking_timestamp",
							"=",
							"classes.class_time"
						)
				)
			)
		)
		.innerJoin("users", "users.user_id", "classes.trainer_id")
		.innerJoin("rooms", "rooms.room_id", "classes.room_id")
		.innerJoin(
			"room_bookings",
			"room_bookings.class_id",
			"classes.class_id"
		)
		.select([
			"classes.trainer_id",
			"classes.class_id",
			"classes.name",
			"classes.price",
			"classes.class_time",
			"users.first_name",
			"users.last_name",
			"rooms.room_number",
			"rooms.room_id",
			"classes.trainer_booking_id",
			"room_bookings.booking_id as room_booking_id",
		])
		.whereRef("classes.class_time", ">", db.fn("NOW"))
		.execute()

	return classes
}

// DELETE
export async function deleteClass(classId: number): Promise<void> {
	console.log(classId)
	try {
		await db.transaction().execute(async (transaction) => {
			console.log("here")
			const trainerBooking = await transaction
				.selectFrom("classes")
				.where("class_id", "=", classId)
				.select("trainer_booking_id")
				.executeTakeFirst()
			console.log("here")
			if (!trainerBooking) {
				throw new Error("No such class found")
			}
			console.log("here2")
			// await transaction.deleteFrom("trainer_booking")
			// 	.where("trainer_booking_id", "=", trainerBooking.trainer_booking_id)
			// 	.execute()
			console.log("here3")
			const classDeleted = await transaction
				.deleteFrom("classes")
				.where("class_id", "=", classId)
				.execute()

			console.log("here")
			console.log(classDeleted)
		})
	} catch (e) {
		console.log(e)
		throw new Error("Error deleting class")
	}

	return
}
export async function getMemberAvailableClasses(memberId: number) {
	const classes = await db
		.selectFrom("classes")
		.where(({ not, exists, selectFrom }) =>
			not(
				exists(
					selectFrom("member_bookings")
						.where("member_id", "=", memberId)
						.whereRef(
							"booking_timestamp",
							"=",
							"classes.class_time"
						)
				)
			)
		)
		.selectAll()
		.execute()

	return classes
}

// PATCH

export async function rescheduleClass(
	timestamp: Date,
	classId: number
): Promise<ClassesData> {
	// need to check if trainer and room are available
	try {
		const availableTrainers = await getAvailableTrainers(timestamp)
		const availableRooms = await getAvailableRooms(timestamp)
		console.log(timestamp)

		const classe = await db.transaction().execute(async (transaction) => {
			const classData = await transaction
				.selectFrom("classes")
				.where("class_id", "=", classId)
				.selectAll()
				.executeTakeFirst()

			if (!classData) {
				throw new Error("No such class found")
			}

			if (
				classData.trainer_id &&
				!availableTrainers.includes(classData?.trainer_id)
			) {
				throw new Error("Trainer is not available")
			}

			if (
				classData.room_id &&
				!availableRooms.some(
					(room) => room.room_id === classData.room_id
				)
			) {
				throw new Error("Room is not available")
			}

			const updatedClass = await transaction
				.updateTable("classes")
				.set("class_time", timestamp)
				.where("class_id", "=", classId)
				.returningAll()
				.executeTakeFirstOrThrow()

			const updatedTrainerBooking = await transaction
				.updateTable("trainer_booking")
				.set("trainer_booking_timestamp", timestamp)
				.where("trainer_booking_id", "=", classData.trainer_booking_id)
				.returningAll()
				.executeTakeFirstOrThrow()

			const updatedRoomBooking = await transaction
				.updateTable("room_bookings")
				.set("class_time", timestamp)
				.where("class_id", "=", classId)
				.returningAll()
				.executeTakeFirstOrThrow()

			// find member class booking
			const memberClassBookingIds = await transaction
				.selectFrom("member_class_booking")
				.select("member_class_booking_id")
				.where("class_id", "=", classId)
				.execute()

			if (memberClassBookingIds.length > 0) {
				// update member bookings
				await transaction
					.updateTable("member_bookings")
					.set("booking_timestamp", timestamp)
					.where(
						"member_booking_id",
						"in",
						memberClassBookingIds.map(
							(m) => m.member_class_booking_id
						)
					)
					.execute()
			}

			return updatedClass
		})
		return classe
	} catch (e) {
		console.log(e)
		throw new Error("Error rescheduling class")
	}
}

export async function moveClassRoom(
	classId: number,
	roomBookingId: number,
	newRoomId: number
): Promise<ClassesData> {
	const classTime = await db
		.selectFrom("classes")
		.where("classes.class_id", "=", classId)
		.select("class_time")
		.executeTakeFirstOrThrow()
	if (!classTime || classTime.class_time === null) {
		throw new Error("No such class found")
	}
	const availableRooms = await getAvailableRooms(classTime.class_time)
	console.log(availableRooms)
	// filter for newRoomId
	const newRoom = availableRooms.find(
		(room: any) => room.room_id === newRoomId
	)
	if (!newRoom) {
		throw new Error("Room is not available")
	}

	const changeRoom = await db.transaction().execute(async (transaction) => {
		transaction
			.updateTable("room_bookings")
			.set("room_id", newRoomId)
			.where("booking_id", "=", roomBookingId)
			.execute()
		transaction
			.updateTable("classes")
			.set("room_id", newRoomId)
			.where("classes.class_id", "=", classId)
			.execute()
	})

	const classe = getClassByClassId(classId)

	return classe
}
