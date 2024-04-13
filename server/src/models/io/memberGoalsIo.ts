import { MemberGoals } from "../db/types"

export type memberGoalData =
	| (Omit<
			MemberGoals,
			"goal_id" | "achieved_date" | "goal_start" | "deleted" | "goal_end"
	  > & {
			goal_id: number
			achieved_date: Date | null
			goal_start: Date
			deleted: boolean
			goal_end: Date
	  })
	| null

export type memberGoalApiRequest = {
	weight_goal: number
	goal_end: Date
}

export type memberGoalApiResponse = {
	message: string
	status: number
	data: memberGoalData
}

export type memberGoalsApiResponse = {
	message: string
	status: number
	data: memberGoalData[]
}
