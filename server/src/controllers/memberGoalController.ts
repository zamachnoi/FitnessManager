import {
	memberGoalApiRequest,
	memberGoalApiResponse,
	memberGoalsApiResponse,
} from "../models/io/memberGoalsIo"
import * as memberGoalsData from "../data/memberGoalsData"

export async function generateMemberGoalPostResponse(
	member_id: number,
	goal: memberGoalApiRequest
): Promise<memberGoalApiResponse> {
	try {
		const memberGoal = await memberGoalsData.createMemberGoal(
			member_id,
			goal
		)
		let res: memberGoalApiResponse = {
			message: `success`,
			status: 200,
			data: memberGoal,
		}
		return res
	} catch (e) {
		return {
			message: "Could not create member goal",
			status: 404,
			data: null,
		}
	}
}

export async function generateMemberGoalsGetResponse(
	member_id: number
): Promise<memberGoalsApiResponse> {
	try {
		const memberGoals = await memberGoalsData.getMemberGoals(member_id)
		let res: memberGoalsApiResponse = {
			message: `success`,
			status: 200,
			data: memberGoals,
		}
		return res
	} catch (e) {
		return {
			message: "Could not find member goals",
			status: 404,
			data: [],
		}
	}
}

export async function generateMemberGoalByIdGetResponse(
	member_id: number,
	goal_id: number
): Promise<memberGoalApiResponse> {
	try {
		const memberGoal = await memberGoalsData.getMemberGoalById(
			member_id,
			goal_id
		)
		let res: memberGoalApiResponse = {
			message: `success`,
			status: 200,
			data: memberGoal,
		}
		return res
	} catch (e) {
		return {
			message: "Could not find member goal",
			status: 404,
			data: null,
		}
	}
}

export async function generateMemberGoalAchievePatchResponse(
	member_id: number,
	goal_id: number
): Promise<memberGoalApiResponse> {
	try {
		const memberGoal = await memberGoalsData.achieveMemberGoal(
			member_id,
			goal_id
		)
		let res: memberGoalApiResponse = {
			message: `success`,
			status: 200,
			data: memberGoal,
		}
		return res
	} catch (e) {
		return {
			message: "Could not achieve member goal",
			status: 404,
			data: null,
		}
	}
}

export async function generateMemberGoalDeletePatchResponse(
	member_id: number,
	goal_id: number
): Promise<memberGoalApiResponse> {
	try {
		const memberGoal = await memberGoalsData.deleteMemberGoal(
			member_id,
			goal_id
		)
		let res: memberGoalApiResponse = {
			message: `success`,
			status: 200,
			data: memberGoal,
		}
		return res
	} catch (e) {
		return {
			message: "Could not delete member goal",
			status: 404,
			data: null,
		}
	}
}
