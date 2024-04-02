import {
	LoginApiRequest,
	LoginApiResponse,
	RegisterApiRequest,
	RegisterApiResponse,
	LogoutApiResponse,
} from "../models/io/authIo"

import { Request, Response } from "express"

import * as authData from "../data/authData"

export async function generateAuthRegisterPostResponse(
	req: Request,
	res: Response,
	registerDetails: RegisterApiRequest
) {
	try {
		const user = await authData.createAccount(registerDetails)

		let res: RegisterApiResponse = {
			message: `success`,
			status: 200,
			data: user,
		}

		const sessionData = {
			user_id: user.user_id,
			type: user.type,
			authenticated: true,
		}

		req.session.user = sessionData

		return res
	} catch (e) {
		console.log(e)
		return {
			message: "Could not create account",
			status: 404,
			data: null,
		}
	}
}

export async function generateAuthLoginPostResponse(
	req: Request,
	res: Response,
	loginDetails: LoginApiRequest
): Promise<LoginApiResponse> {
	try {
		const user = await authData.login(loginDetails)

		let res: LoginApiResponse = {
			message: `success`,
			status: 200,
			data: user,
		}

		const sessionData = {
			user_id: user.user_id,
			type: user.type,
			authenticated: true,
		}

		req.session.user = sessionData

		console.log(req.session.user)

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
	req: Request,
	res: Response
): Promise<LogoutApiResponse> {
	req.session.destroy((err) => {
		if (err) {
			return {
				message: "Could not logout",
				status: 404,
			}
		}
	})

	console.log(req.session)

	return {
		message: "Logged out",
		status: 200,
	}
}
