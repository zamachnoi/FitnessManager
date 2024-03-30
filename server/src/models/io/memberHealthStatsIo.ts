import { MemberHealthStatistics, Timestamp } from "../db/types"

export type MemberHealthStatsData = Omit<
	MemberHealthStatistics,
	"stat_id" | "recorded"
> & {
	stat_id: number
	recorded: Date | null
}

export type MemberHealthStatsApiRequest = {
	heart_rate: number
	systolic_bp: number
	diastolic_bp: number
}

export type MemberHealthStatsApiResponse = {
	message: string
	status: number
	data: MemberHealthStatsData | null
}

export type MemberHealthStatsArrayApiResponse = {
	message: string
	status: number
	data: MemberHealthStatsData[] | null
}
