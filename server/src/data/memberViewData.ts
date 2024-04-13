import { db } from "../lib/db"
import { MemberViewData } from "../models/io/memberViewIo"
export async function getMemberViewData(
	memberId: number
): Promise<MemberViewData> {
	const member_routines = await db
		.selectFrom("member_exercise_routines")
		.where("member_id", "=", memberId)
		.innerJoin(
			"exercise_routines",
			"member_exercise_routines.routine_id",
			"exercise_routines.routine_id"
		)
		.innerJoin(
			"routine_exercises",
			"exercise_routines.routine_id",
			"routine_exercises.exercise_id"
		)
		.innerJoin(
			"exercises",
			"routine_exercises.exercise_id",
			"exercises.exercise_id"
		)
		.innerJoin(
			"equipment_type",
			"exercises.equipment_type_id",
			"equipment_type.equipment_type_id"
		)
		.select([
			"member_exercise_routines.routine_id",
			"exercise_routines.name as routine_name",
			"exercises.exercise_id",
			"exercises.name as exercise_name",
			"exercises.type as exercise_type",
			"exercises.description as exercise_description",
			"equipment_type.name as equipment_name",
		])
		.execute()

	const memberData = await db
		.selectFrom("members")
		.innerJoin("users", "member_id", "user_id")
		.where("member_id", "=", memberId)
		.selectAll()
		.executeTakeFirstOrThrow()

	const allGoals = await db
		.selectFrom("member_goals")
		.where("member_id", "=", memberId)
		.where("deleted", "=", false)
		.selectAll()
		.execute()

	const { unachieved_goals, achieved_goals } = separateGoals(allGoals)

	const viewData: MemberViewData = {
		member_data: removePassword(memberData),
		unachieved_goals,
		achieved_goals,
		routines: transformMemberRoutines(member_routines),
		bookings: {
			trainer_bookings: await db
				.selectFrom("member_trainer_booking")

				.innerJoin(
					"trainers",
					"member_trainer_booking.trainer_id",
					"trainers.trainer_id"
				)
				.innerJoin("users", "trainers.trainer_id", "users.user_id")
				.innerJoin(
					"member_bookings",
					"member_trainer_booking.member_booking_id",
					"member_bookings.member_booking_id"
				)
				.where(
					"member_trainer_booking.member_booking_id",
					"=",
					memberId
				)
				.selectAll()
				.execute(),
			class_bookings: await db
				.selectFrom("member_class_booking")
				.innerJoin(
					"classes",
					"member_class_booking.class_id",
					"classes.class_id"
				)
				.innerJoin("rooms", "classes.room_id", "rooms.room_id")
				.innerJoin(
					"member_bookings",
					"member_class_booking.member_class_booking_id",
					"member_bookings.member_booking_id"
				)
				.innerJoin("users", "classes.trainer_id", "users.user_id")
				.where("member_class_booking.member_id", "=", memberId)
				.select([
					"classes.class_id",
					"classes.name as class_name",
					"classes.price",
					"classes.price",
					"users.first_name",
					"users.last_name",
					"rooms.room_number",
					"member_bookings.booking_timestamp",
					"member_class_booking.member_class_booking_id as member_booking_id",
				])
				.execute(),
		},
	}
	return viewData
}
function transformMemberRoutines(
	member_routines: {
		routine_id: number
		exercise_id: number
		routine_name: string
		exercise_name: string
		exercise_type: string
		exercise_description: string
		equipment_name: string
	}[]
): {
	routine_id: number
	routine_name: string
	exercises: {
		exercise_id: number
		exercise_name: string
		exercise_type: string
		exercise_description: string
		equipment_name: string
	}[]
}[] {
	// Group routines by routine_id and routine_name
	const groupedRoutines = member_routines.reduce(
		(acc, routine) => {
			if (!acc[routine.routine_id]) {
				acc[routine.routine_id] = {
					routine_id: routine.routine_id,
					routine_name: routine.routine_name,
					exercises: [],
				}
			}

			// Add exercise to routine
			acc[routine.routine_id].exercises.push({
				exercise_id: routine.exercise_id,
				exercise_name: routine.exercise_name,
				exercise_type: routine.exercise_type,
				exercise_description: routine.exercise_description,
				equipment_name: routine.equipment_name,
			})

			return acc
		},
		{} as Record<
			number,
			{
				routine_id: number
				routine_name: string
				exercises: {
					exercise_id: number
					exercise_name: string
					exercise_type: string
					exercise_description: string
					equipment_name: string
				}[]
			}
		>
	)

	// Convert grouped routines object to array
	return Object.values(groupedRoutines)
}

function removePassword<T extends { password?: any }>(
	data: T
): Omit<T, "password"> {
	const { password, ...dataWithoutPassword } = data
	return dataWithoutPassword
}

function separateGoals(
	allGoals: {
		achieved_date: Date | null
		member_id: number
		deleted: boolean
		goal_end: Date
		goal_id: number
		goal_start: Date
		weight_goal: number
	}[]
) {
	const unachieved_goals: {
		goal_id: number
		weight_goal: number
		goal_end: Date
		goal_start: Date
	}[] = []

	const achieved_goals: {
		goal_id: number
		weight_goal: number
		goal_end: Date
		achieved_date: Date | null
		goal_start: Date
	}[] = []

	allGoals.forEach((goal) => {
		if (goal.achieved_date === null) {
			unachieved_goals.push({
				goal_id: goal.goal_id,
				weight_goal: goal.weight_goal,
				goal_end: goal.goal_end,
				goal_start: goal.goal_start,
			})
		} else {
			achieved_goals.push({
				goal_id: goal.goal_id,
				weight_goal: goal.weight_goal,
				goal_end: goal.goal_end,
				achieved_date: goal.achieved_date,
				goal_start: goal.goal_start,
			})
		}
	})

	return { unachieved_goals, achieved_goals }
}
