import { MemberHealthStatistics } from "../../models/db/types"

export type GetMemberHealthStatsApiResponse = Omit<MemberHealthStatistics, 'stat_id'> & {	
  stat_id: number
}


