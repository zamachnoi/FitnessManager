import {
	LoginApiRequest,
	LoginApiResponse,
	RegisterApiRequest,
	RegisterApiResponse,
	LogoutApiResponse,
} from "../models/io/authIo"

import * as authData from "../data/authData"

export default async function generateAuthRegisterPostResponse(
	registerDetails: RegisterApiRequest
) {
	try {
		const user = await authData.createAccount(registerDetails)

		let res: RegisterApiResponse = {
			message: `success`,
			status: 200,
			data: user,
		}
	} catch (e) {
		return {
			message: "Could not create account",
			status: 404,
			data: null,
		}
	}
}

export async function generateAuthLoginPostResponse(
	loginDetails: LoginApiRequest
): Promise<LoginApiResponse> {
	try {
		const success = await authData.login(loginDetails)

		let res: LoginApiResponse = {
			message: `success`,
			status: 200,
			data: success,
		}
		return res
	} catch (e) {
		return {
			message: "Could not login",
			status: 404,
			data: null,
		}
	}
}
