import { db } from "../lib/db"
import {
	memberGoalApiRequest,
	memberGoalData,
} from "../models/io/memberGoalsIo"

export async function createMemberGoal(
	member_id: number,
	goal: memberGoalApiRequest
): Promise<memberGoalData> {
	const { weight_goal } = goal
	const goal_start = new Date().toISOString()
	const memberGoal = await db
		.insertInto("member_goals")
		.values({ member_id, weight_goal, goal_start })
		.returningAll()
		.executeTakeFirst()

	if (!memberGoal) {
		throw new Error("Failed to create member goal")
	}

	return memberGoal
}

export async function getMemberGoals(
	member_id: number
): Promise<memberGoalData[]> {
	const memberGoals = await db
		.selectFrom("member_goals")
		.where("member_id", "=", member_id)
		.selectAll()
		.execute()

	return memberGoals
}

export async function getMemberGoalById(
	member_id: number,
	goal_id: number
): Promise<memberGoalData> {
	const memberGoal = await db
		.selectFrom("member_goals")
		.where("member_id", "=", member_id)
		.where("goal_id", "=", goal_id)
		.selectAll()
		.executeTakeFirst()

	if (!memberGoal) {
		throw new Error("No member goal found")
	}

	return memberGoal
}

export async function updateMemberGoal(
	member_id: number,
	goal_id: number,
	goal: memberGoalApiRequest
): Promise<memberGoalData> {
	const { weight_goal } = goal
	const memberGoal = await db
		.updateTable("member_goals")
		.set({ weight_goal })
		.where("member_id", "=", member_id)
		.where("goal_id", "=", goal_id)
		.returningAll()
		.executeTakeFirst()

	if (!memberGoal) {
		throw new Error("Failed to update member goal")
	}

	return memberGoal
}

export async function deleteMemberGoal(
	member_id: number,
	goal_id: number
): Promise<memberGoalData> {
	const memberGoal = await db
		.updateTable("member_goals")
		.set({ deleted: true })
		.where("member_id", "=", member_id)
		.where("goal_id", "=", goal_id)
		.returningAll()
		.executeTakeFirst()

	if (!memberGoal) {
		throw new Error("Failed to delete member goal")
	}

	return memberGoal
}

export async function achieveMemberGoal(
	member_id: number,
	goal_id: number
): Promise<memberGoalData> {
	const achieved_date = new Date().toISOString()
	const memberGoal = await db
		.updateTable("member_goals")
		.set({ achieved_date })
		.where("member_id", "=", member_id)
		.where("goal_id", "=", goal_id)
		.returningAll()
		.executeTakeFirst()

	if (!memberGoal) {
		throw new Error("Failed to achieve member goal")
	}

	return memberGoal
}

export async function getAchievedGoals(
	member_id: number
): Promise<memberGoalData[]> {
	const memberGoals = await db
		.selectFrom("member_goals")
		.where("member_id", "=", member_id)
		.where("achieved_date", "!=", null)
		.selectAll()
		.execute()

	return memberGoals
}

export async function getUnachievedGoals(
	member_id: number
): Promise<memberGoalData[]> {
	const memberGoals = await db
		.selectFrom("member_goals")
		.where("member_id", "=", member_id)
		.where("achieved_date", "=", null)
		.selectAll()
		.execute()

	return memberGoals
}

export async function getDeletedGoals(
	member_id: number
): Promise<memberGoalData[]> {
	const memberGoals = await db
		.selectFrom("member_goals")
		.where("member_id", "=", member_id)
		.where("deleted", "=", true)
		.selectAll()
		.execute()

	return memberGoals
}

export async function getActiveGoals(
	member_id: number
): Promise<memberGoalData[]> {
	const memberGoals = await db
		.selectFrom("member_goals")
		.where("member_id", "=", member_id)
		.where("deleted", "=", false)
		.where("achieved_date", "=", null)
		.selectAll()
		.execute()

	return memberGoals
}
