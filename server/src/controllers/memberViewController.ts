import { MemberViewApiResponse } from "../models/io/memberViewIo"
import { getMemberViewData } from "../data/memberViewData"

export async function generateMemberViewGetResponse(
	memberId: number
): Promise<MemberViewApiResponse> {
	try {
		const memberViewData = await getMemberViewData(memberId)
		let res: MemberViewApiResponse = {
			message: `success`,
			status: 200,
			data: memberViewData,
		}
		return res
	} catch (e) {
		console.log(e)
		return {
			message: "Could not find member view data",
			status: 404,
			data: null,
		}
	}
}
