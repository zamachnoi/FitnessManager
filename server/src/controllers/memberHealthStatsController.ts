import {
	MemberHealthStatsApiRequest,
	MemberHealthStatsApiResponse,
	MemberHealthStatsArrayApiResponse,
} from "../models/io/memberHealthStatsIo"

import * as memberHealthStatsData from "../data/memberHealthStatsData"

// GET
export async function generateMemberHealthStatsGetResponse(
	member_id: number
): Promise<MemberHealthStatsArrayApiResponse> {
	try {
		const memberHealthStats =
			await memberHealthStatsData.getAllMemberHealthStats(member_id)
		let res: MemberHealthStatsArrayApiResponse = {
			message: `success`,
			status: 200,
			data: memberHealthStats,
		}
		return res
	} catch (e) {
		return {
			message: "Could not find member health stats",
			status: 404,
			data: [],
		}
	}
}

export async function generateMemberHealthStatsGetByIdResponse(
	member_id: number,
	stat_id: number
): Promise<MemberHealthStatsApiResponse> {
	try {
		const memberHealthStats =
			await memberHealthStatsData.getMemberHealthStatsById(
				member_id,
				stat_id
			)
		let res: MemberHealthStatsApiResponse = {
			message: `success`,
			status: 200,
			data: memberHealthStats,
		}
		return res
	} catch (e) {
		return {
			message: "Could not find member health stats",
			status: 404,
			data: null,
		}
	}
}

// POST
export async function generateMemberHealthStatsPostResponse(
	member_id: number,
	stats: MemberHealthStatsApiRequest
): Promise<MemberHealthStatsApiResponse> {
	try {
		const memberHealthStats =
			await memberHealthStatsData.createMemberHealthStats(
				member_id,
				stats
			)
		let res: MemberHealthStatsApiResponse = {
			message: `success`,
			status: 200,
			data: memberHealthStats,
		}
		return res
	} catch (e) {
		return {
			message: "Could not create member health stats",
			status: 404,
			data: null,
		}
	}
}
