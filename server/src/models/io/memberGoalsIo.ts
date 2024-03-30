import { MemberGoals } from "../db/types"

export type memberGoalData =
	| (Omit<
			MemberGoals,
			"goal_id" | "achieved_date" | "goal_start" | "deleted"
	  > & {
			goal_id: number
			achieved_date: Date | null
			goal_start: Date | null
			deleted: boolean | null
	  })
	| null

export type memberGoalApiRequest = {
	weight_goal: number
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
