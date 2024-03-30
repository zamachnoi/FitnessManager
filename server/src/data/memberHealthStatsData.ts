import { db } from "../lib/db"
import {
	MemberHealthStatsData,
	MemberHealthStatsApiRequest,
} from "../models/io/memberHealthStatsIo"

export async function getAllMemberHealthStats(
	memberId: number
): Promise<MemberHealthStatsData[]> {
	const memberHealthStats = await db
		.selectFrom("member_health_statistics")
		.where("member_id", "=", memberId)
		.selectAll()
		.execute()

	return memberHealthStats
}

export async function getMemberHealthStatsById(
	memberId: number,
	statId: number
): Promise<MemberHealthStatsData> {
	const memberHealthStats = await db
		.selectFrom("member_health_statistics")
		.where("member_id", "=", memberId)
		.where("stat_id", "=", statId)
		.selectAll()
		.executeTakeFirst()

	if (!memberHealthStats) {
		throw new Error("No member health stats found")
	}

	return memberHealthStats
}

export async function createMemberHealthStats(
	memberId: number,
	stats: MemberHealthStatsApiRequest
): Promise<MemberHealthStatsData> {
	const { heart_rate, systolic_bp, diastolic_bp } = stats
	const recorded = new Date().toISOString()
	const memberHealthStats = await db
		.insertInto("member_health_statistics")
		.values({
			member_id: memberId,
			heart_rate,
			systolic_bp,
			diastolic_bp,
			recorded,
		})
		.returningAll()
		.executeTakeFirst()

	if (!memberHealthStats) {
		throw new Error("Failed to create member health stats")
	}

	return memberHealthStats
}
