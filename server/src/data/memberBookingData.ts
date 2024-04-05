import {
	MemberTrainerBookingData,
	MemberTrainerBookingRequest,
	MemberBookingData,
	MemberClassBookingData,
	MemberAvailableHoursResponse,
	MemberTrainerBookingDbData,
} from "../models/io/memberBookingIo"
import { db } from "../lib/db"
import { sql } from "kysely"
import { MemberBookings, MemberClassBooking } from "../models/db/types"
import { ChangeMemberBookingRequest } from "../models/io/memberBookingIo"
import { getAvailableTrainers } from "./trainersData"

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
					date_paid: new Date().toUTCString(),
					processed: false,
				})
				.returningAll()
				.executeTakeFirstOrThrow()

			return bookingData
		})
	return memberTrainerBooking
}

export async function getMemberAvailableHours(memberId: number, date: string) {
	const availableTimes = Array.from({ length: 24 }, (_, i) => i)

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

	const availableTimesFiltered = availableTimes.filter(
		(time) => !bookedTimes.includes(time)
	)

	return availableTimesFiltered
}

export async function bookClass(
	memberId: number,
	classId: number
): Promise<MemberClassBookingData> {
	console.log(memberId, classId)
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
				member_id: memberId,
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
				date_paid: new Date().toUTCString(),
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
			member_booking_id: memberClassBooking.member_class_booking_id,
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
			"cl.name",
			"cl.price",
			"u.first_name",
			"u.last_name",
			"r.room_number",
			"mb.booking_timestamp",
			"mb.member_booking_id",
		])
		.where("mb.member_id", "=", memberId)
		.where("mb.type", "=", "Class")
		.orderBy("mb.booking_timestamp", "asc")
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
			"mb.member_booking_id",
			"mtb.trainer_booking_id",
		])
		.where("mb.member_id", "=", memberId)
		.where("mb.type", "=", "Trainer")
		.orderBy("mb.booking_timestamp", "asc")
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

export async function deleteMemberClassBooking(
	memberId: number,
	bookingId: number
): Promise<void> {
	const deletedBooking = await db
		.deleteFrom("member_bookings")
		.where("member_id", "=", memberId)
		.where("member_booking_id", "=", bookingId)
		.executeTakeFirstOrThrow()
}

// delete
export async function deleteMemberTrainerBooking(
	memberId: number,
	memberBookingId: number,
	trainerBookingId: number
): Promise<void> {
	// delete member booking and trainer booking
	try {
		await db.transaction().execute(async (trx) => {
			await trx
				.deleteFrom("member_bookings")
				.where("member_id", "=", memberId)
				.where("member_booking_id", "=", memberBookingId)
				.execute()

			await trx
				.deleteFrom("trainer_booking")
				.where("trainer_booking_id", "=", trainerBookingId)
				.execute()
		})
	} catch (e) {
		throw new Error("Failed to delete booking")
	}
}

export async function getTrainerAvailableHours(
	trainerId: number,
	date: string
): Promise<number[]> {
	const availableTimes = Array.from({ length: 24 }, (_, i) => i)
	const trainerBookings = await db
		.selectFrom("trainer_booking")
		.select(
			sql<string>`EXTRACT(HOUR FROM trainer_booking_timestamp AT TIME ZONE \'America/New_York\')`.as(
				"hour"
			)
		)
		.where("trainer_id", "=", trainerId)
		.where(db.fn("DATE", ["trainer_booking_timestamp"]), "=", date)
		.execute()

	if (!trainerBookings) {
		return availableTimes
	}

	const bookedTimes = trainerBookings.map((booking) => parseInt(booking.hour))

	const availableTimesFiltered = availableTimes.filter(
		(time) => !bookedTimes.includes(time)
	)

	return availableTimesFiltered
}

export async function changeMemberTrainerBooking(
	memberBookingRequest: ChangeMemberBookingRequest
): Promise<MemberTrainerBookingDbData> {
	const {
		booking_id,
		booking_timestamp: booking_timestamp,
		trainer_booking_id,
		member_id,
		trainer_id,
	} = memberBookingRequest

	const availableTrainers = await getAvailableTrainers(booking_timestamp)

	if (
		!availableTrainers.some((trainer) => trainer.trainer_id === trainer_id)
	) {
		throw new Error("Trainer is not available")
	}

	const changeBooking = await db.transaction().execute(async (trx) => {
		const memberBooking = await trx
			.updateTable("member_bookings")
			.where("member_booking_id", "=", booking_id)
			.set("booking_timestamp", booking_timestamp)
			.returning(["booking_timestamp"])
			.executeTakeFirstOrThrow()

		const trainerBooking = await trx
			.updateTable("trainer_booking")
			.where("trainer_booking_id", "=", trainer_booking_id)
			.set("trainer_booking_timestamp", memberBooking.booking_timestamp)
			.returningAll()
			.executeTakeFirstOrThrow()
	})

	const bookingResponse = await db
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
			"mb.member_booking_id",
			"mtb.trainer_booking_id",
		])
		.where("mb.member_id", "=", member_id)
		.where("mb.type", "=", "Trainer")
		.where("mb.member_booking_id", "=", booking_id)
		.executeTakeFirstOrThrow()
	return bookingResponse
}
