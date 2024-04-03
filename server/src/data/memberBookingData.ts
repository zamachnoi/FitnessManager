import {
	MemberTrainerBookingData,
	MemberTrainerBookingRequest,
	AvailableTrainersData,
	MemberBookingData,
	MemberClassBookingData,
} from "../models/io/memberBookingIo"
import { db } from "../lib/db"
import { sql } from "kysely"
import { MemberClassBooking } from "../models/db/types"

export async function bookTrainer(
	memberId: number,
	bookingRequest: MemberTrainerBookingRequest
): Promise<MemberTrainerBookingData> {
	const { trainer_id, booking_timestamp } = bookingRequest

	const availableTrainers = await getAvailableTrainers(booking_timestamp)

	if (
		!availableTrainers.some((trainer) => trainer.trainer_id === trainer_id)
	) {
		throw new Error("Trainer is not available")
	}

	const memberAvailable = await getMemberAvailable(
		booking_timestamp,
		memberId
	)

	if (!memberAvailable) {
		throw new Error("Member is not available")
	}

	const memberTrainerBooking = await db
		.transaction()
		.execute(async (transaction) => {
			// check if trainer is available
			const memberBookingId = await transaction
				.insertInto("member_bookings")
				.values({
					member_id: memberId,
					booking_timestamp: booking_timestamp,
					type: "Trainer",
				})
				.returning("member_booking_id")
				.executeTakeFirstOrThrow()

			const trainerBooking = await transaction
				.insertInto("trainer_booking")
				.values({
					trainer_id,
					trainer_booking_timestamp: booking_timestamp,
				})
				.returningAll()
				.executeTakeFirstOrThrow()

			const memberTrainerBookingData = {
				member_id: memberId,
				trainer_id,
				member_booking_id: memberBookingId.member_booking_id,
				trainer_booking_id: trainerBooking.trainer_booking_id,
			}
			const memberTrainerBooking = await transaction
				.insertInto("member_trainer_booking")
				.values(memberTrainerBookingData)
				.returningAll()
				.executeTakeFirstOrThrow()

			const bookingData: MemberTrainerBookingData = {
				...memberTrainerBooking,
				booking_timestamp,
			}

			const payment = await transaction
				.insertInto("payments")
				.values({
					member_id: memberId,
					booking_id: bookingData.member_booking_id,
					amount_paid: (
						await db
							.selectFrom("trainers")
							.select("rate")
							.where("trainer_id", "=", trainer_id)
							.executeTakeFirstOrThrow()
					).rate,
					date_paid: new Date(),
					processed: false,
				})
				.returningAll()
				.executeTakeFirstOrThrow()

			return bookingData
		})
	return memberTrainerBooking
}

export async function getAvailableTrainers(
	timestamp: Date
): Promise<AvailableTrainersData[]> {
	const hourOfInterest = timestamp.getHours()

	const availableTrainers = await db
		.selectFrom("trainers")
		.innerJoin("users", "user_id", "trainer_id")
		.select(["trainer_id", "first_name", "last_name", "rate"])
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

	return availableTrainers
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

export async function bookClass(
	memberId: number,
	classId: number
): Promise<MemberClassBookingData> {
	const res = await db.transaction().execute(async (trx) => {
		const joiningClass = await trx
			.selectFrom("classes")
			.selectAll()
			.where("class_id", "=", classId)
			.executeTakeFirstOrThrow()

		const classTime = joiningClass.class_time

		if (!classTime) {
			throw new Error("Class does not have a time")
		}
		const memberAvailable = await getMemberAvailable(classTime, memberId)

		if (!memberAvailable) {
			throw new Error("Member is not available")
		}

		const memberBooking = await trx
			.insertInto("member_bookings")
			.values({
				member_id: memberId,
				booking_timestamp: joiningClass.class_time,
				type: "Class",
			})
			.returning("member_booking_id")
			.executeTakeFirstOrThrow()

		const memberClassBooking = await trx
			.insertInto("member_class_booking")
			.values({
				member_class_booking_id: memberBooking.member_booking_id,
				class_id: classId,
			})
			.returningAll()
			.executeTakeFirstOrThrow()
		const payment = await trx
			.insertInto("payments")
			.values({
				member_id: memberId,
				booking_id: memberBooking.member_booking_id,
				amount_paid: joiningClass.price,
				date_paid: new Date(),
				processed: false,
			})
			.returningAll()
			.executeTakeFirstOrThrow()

		const trainerAndClass = await trx
			.selectFrom("classes")
			.innerJoin("trainers", "classes.trainer_id", "trainers.trainer_id")
			.innerJoin("users", "trainers.trainer_id", "users.user_id")
			.innerJoin("rooms", "classes.room_id", "rooms.room_id")
			.select([
				"classes.name",
				"classes.price",
				"users.first_name",
				"users.last_name",
				"rooms.room_number",
			])
			.where("classes.class_id", "=", classId)
			.executeTakeFirstOrThrow()

		const booking: MemberClassBookingData = {
			class_id: classId,
			member_id: memberId,
			booking_timestamp: joiningClass.class_time,
			class_name: joiningClass.name,
			price: joiningClass.price,
			first_name: trainerAndClass.first_name,
			last_name: trainerAndClass.last_name,
			room_number: trainerAndClass.room_number,
			name: trainerAndClass.name,
		}

		return booking
	})
	return res
}

export async function getMemberBookings(
	memberId: number
): Promise<MemberBookingData> {
	const classBookings = await db
		.selectFrom("member_bookings as mb")
		.innerJoin(
			"member_class_booking as mcb",
			"mb.member_booking_id",
			"mcb.member_class_booking_id"
		)
		.innerJoin("classes as cl", "mcb.class_id", "cl.class_id")
		.innerJoin("trainers as t", "cl.trainer_id", "t.trainer_id")
		.innerJoin("users as u", "t.trainer_id", "u.user_id")
		.innerJoin("rooms as r", "cl.room_id", "r.room_id")
		.select([
			"cl.class_id",
			"cl.name as class_name",
			"cl.price",
			"u.first_name",
			"u.last_name",
			"r.room_number",
			"mb.booking_timestamp",
		])
		.where("mb.member_id", "=", memberId)
		.where("mb.type", "=", "Class")
		.execute()

	const trainerBookings = await db
		.selectFrom("member_bookings as mb")
		.innerJoin(
			"member_trainer_booking as mtb",
			"mb.member_booking_id",
			"mtb.member_booking_id"
		)
		.innerJoin("trainers as t", "mtb.trainer_id", "t.trainer_id")
		.innerJoin("users as u", "t.trainer_id", "u.user_id")
		.select([
			"t.trainer_id",
			"u.first_name",
			"u.last_name",
			"t.rate",
			"mb.booking_timestamp",
		])
		.where("mb.member_id", "=", memberId)
		.where("mb.type", "=", "Trainer")
		.execute()

	const memberBookings: MemberBookingData = {
		trainer_bookings: trainerBookings,
		class_bookings: classBookings,
	}

	return memberBookings
}

async function getMemberAvailable(timestamp: Date, memberId: number) {
	const memberBooked = await db
		.selectFrom("member_bookings")
		.selectAll()
		.where("booking_timestamp", "=", timestamp)
		.where("member_id", "=", memberId)
		.executeTakeFirst()

	if (memberBooked) {
		return false
	}
	return true
}
