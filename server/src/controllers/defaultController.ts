import { getDefaultDbData } from "../data/defaultData"
import { DefaultGetApiResponse } from "../models/io/defaultIo"

export async function generateDefaultGetResponse(): Promise<DefaultGetApiResponse> {
	try {
		const user = await getDefaultDbData()
		let res: DefaultGetApiResponse = {
			message: `Hello ${user.first_name} ${user.last_name}`,
			status: "success",
		}
		return res
	} catch (e) {
		return { message: "Could not find user", status: "error" }
	}
}
