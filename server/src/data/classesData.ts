import { db } from "../lib/db"
import { sql } from "kysely"
import { ClassesData, ClassesApiRequest, BookableClassesData } from "../models/io/classesIo"
import { RoomAndBookingData } from "../models/io/roomIo"

export async function getAllClasses(): Promise<BookableClassesData[]> {
	const classes = await db.selectFrom("classes")
		.innerJoin("users", "users.user_id", "classes.trainer_id")
		.innerJoin("rooms", "rooms.room_id", "classes.room_id")
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
			"classes.trainer_booking_id"
		])
		.execute()
	return classes
}

export async function getClassByClassId(classId: number): Promise<ClassesData> {
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
	return classe
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
										"booking_timestamp",
										"=",
										"classes.class_time"
									)
									.whereRef(
										"classes.class_time",
										">",
										db.fn("NOW")
									)
							)
					)
			)
			.innerJoin("users", "users.user_id", "classes.trainer_id")
			.innerJoin("rooms", "rooms.room_id", "classes.room_id")
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
					"classes.trainer_booking_id"
			])
			.execute()


	return classes
}
