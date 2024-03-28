import { getMemberHealthStats } from "../data/memberData";
import { GetMemberHealthStatsApiResponse } from "../models/io/memberIo";

export async function generateMembersGetHealthStatsResponse(memberId?: number): Promise<GetMemberHealthStatsApiResponse> {
  try {
    const memberHealthStats = await getMemberHealthStats(memberId)
    return memberHealthStats
  } catch (e) {
    throw new Error("Could not find member health statistics")
  }
}