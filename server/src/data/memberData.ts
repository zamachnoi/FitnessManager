import { db } from "../lib/db"
import { GetMemberHealthStatsApiResponse } from "../models/io/memberIo"

export async function getMemberHealthStats(memberId?: number): Promise<GetMemberHealthStatsApiResponse> {
  let query = db.selectFrom("member_health_statistics").selectAll()

  if(memberId) {
    query = query.where("member_id", "=", memberId)
  }

  const memberHealthStats = await query.executeTakeFirst()

  if (!memberHealthStats) {
    throw new Error("No member health statistics found")
  }


  return memberHealthStats
}