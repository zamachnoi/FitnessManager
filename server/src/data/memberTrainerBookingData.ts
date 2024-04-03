import {
	MemberTrainerBookingData,
	MemberTrainerBookingRequest,
	AvailableTrainersData,
} from "../models/io/memberTrainerBookingIo"
import { db } from "../lib/db"
import { sql } from "kysely"

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

	const memberAvailable = await getMemberAvailable(booking_timestamp)

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

async function getMemberAvailable(timestamp: Date) {
	const memberBooked = await db
		.selectFrom("member_bookings")
		.selectAll()
		.where("booking_timestamp", "=", timestamp)
		.executeTakeFirst()

	if (memberBooked) {
		return false
	}
	return true
}
