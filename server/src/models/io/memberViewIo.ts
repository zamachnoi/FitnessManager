export type MemberViewData = {
	member_data: {
		member_id: number
		username: string
		first_name: string
		last_name: string
		weight: number | null
	}
	unachieved_goals: {
		goal_id: number
		weight_goal: number
		goal_start: Date
		goal_end: Date
	}[]
	achieved_goals: {
		goal_id: number
		weight_goal: number
		goal_start: Date
		goal_end: Date
		achieved_date: Date | null
	}[]

	routines: {
		routine_id: number
		routine_name: string
		exercises: {
			exercise_id: number
			exercise_name: string
			exercise_type: string
			exercise_description: string
			equipment_name: string
		}[]
	}[]

	bookings: {
		trainer_bookings: {
			trainer_id: number | null
			first_name: string | null
			last_name: string | null
			rate: number | null
			booking_timestamp: Date | null
			member_booking_id: number | null
			trainer_booking_id: number | null
		}[]
		class_bookings: {
			class_id: number | null
			class_name: string | null
			price: number | null
			first_name: string | null
			last_name: string | null
			room_number: number | null
			booking_timestamp: Date | null
			member_booking_id: number | null
		}[]
	}
}

export type MemberViewApiResponse = {
	message: string
	status: number
	data: MemberViewData | null
}
