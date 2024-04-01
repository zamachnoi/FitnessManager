import {
	LoginApiRequest,
	LoginApiResponse,
	RegisterApiRequest,
	RegisterApiResponse,
	LogoutApiResponse,
} from "../models/io/authIo"

import { Request } from "express"

import * as authData from "../data/authData"

export async function generateAuthRegisterPostResponse(
	req: Request,
	registerDetails: RegisterApiRequest
) {
	try {
		const user = await authData.createAccount(registerDetails)

		let res: RegisterApiResponse = {
			message: `success`,
			status: 200,
			data: user,
		}

		req.session.user_id = user.user_id
		req.session.type = user.type || undefined
		req.session.authenticated = true

		return res
	} catch (e) {
		return {
			message: "Could not create account",
			status: 404,
			data: null,
		}
	}
}

export async function generateAuthLoginPostResponse(
	req: Request,
	loginDetails: LoginApiRequest
): Promise<LoginApiResponse> {
	try {
		const user = await authData.login(loginDetails)

		let res: LoginApiResponse = {
			message: `success`,
			status: 200,
			data: user,
		}

		req.session.user_id = user.user_id
		req.session.type = user.type || undefined
		req.session.authenticated = true

		return res
	} catch (e) {
		return {
			message: "Could not login",
			status: 404,
			data: null,
		}
	}
}

export async function generateAuthLogoutPostResponse(
	req: Request
): Promise<LogoutApiResponse> {
	req.session.destroy((err) => {
		if (err) {
			return {
				message: "Could not logout",
				status: 404,
			}
		}
	})

	return {
		message: "Logged out",
		status: 200,
	}
}
