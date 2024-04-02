import {
	MemberTrainerBookingData,
	MemberTrainerBookingRequest,
} from "../models/io/memberTrainerBookingIo"
import { db } from "../lib/db"

async function isTrainerAvailable(
	trainerId: number,
	bookingDateTime: Date
): Promise<boolean> {
	const booked = await db
		.selectFrom("trainer_booking")
		.where("trainer_id", "=", trainerId)
		.where("booking_date_and_time", "=", bookingDateTime)
		.selectAll()
		.executeTakeFirst()

	if (booked) {
		return false
	}

	return true
}

export async function bookTrainer(
	memberId: number,
	bookingRequest: MemberTrainerBookingRequest
): Promise<MemberTrainerBookingData> {
	// Start a transaction
	const res = await db.transaction().execute(async (transaction) => {
		// check if trainer is available
		const trainerAvailable: boolean = await isTrainerAvailable(
			bookingRequest.trainer_id,
			bookingRequest.booking_date_and_time
		)

		if (!trainerAvailable) {
			throw new Error("Trainer is not available")
		}

		// create base booking
		const memberBookingId = await transaction
			.insertInto("member_booking")
			.values({ member_id: memberId })
			.returning("booking_id")
			.execute()

		if (!memberBookingId) {
			throw new Error("Failed to create member booking")
		}

		// create trainer booking
		const trainerBookingValues = await transaction
			.insertInto("trainer_booking")
			.values({
				trainer_id: bookingRequest.trainer_id,
				booking_date_and_time: bookingRequest.booking_date_and_time,
			})
			.returningAll()
			.executeTakeFirst()

		if (!trainerBookingValues) {
			throw new Error("Failed to create trainer booking")
		}

		const bookingDateTime =
			new Date(bookingRequest.booking_date_and_time) || new Date()

		// create member trainer booking
		const memberTrainerBookingValues = {
			member_trainer_booking_id: memberBookingId[0].booking_id,
			trainer_id: trainerBookingValues.trainer_id,
			trainer_booking_id: trainerBookingValues.trainer_booking_id,
		}

		const memberTrainerBooking = await transaction
			.insertInto("member_trainer_booking")
			.values(memberTrainerBookingValues)
			.returningAll()
			.executeTakeFirstOrThrow()

		if (!trainerBookingValues) {
			throw new Error("Failed to create member trainer booking")
		}

		// recreate object
		const res: MemberTrainerBookingData = {
			member_trainer_booking_id:
				memberTrainerBooking.member_trainer_booking_id,
			member_id: memberId,
			booking_date_and_time: bookingDateTime,
			trainer_id: bookingRequest.trainer_id,
			trainer_booking_id: memberTrainerBooking.trainer_booking_id,
		}

		return res
	})
	return res
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
							.where("booking_date_and_time", "=", timestamp)
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
