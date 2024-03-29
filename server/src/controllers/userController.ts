import { UserApiResponse, UsersApiResponse } from "../models/io/userIo"
import { getUserById, getUserByUsername, getAllUsers } from "../data/userData"

export async function generateUserByIdGetResponse(
	id: number
): Promise<UserApiResponse> {
	try {
		const user = await getUserById(id)
		let res: UserApiResponse = {
			message: `success`,
			status: 200,
			data: user,
		}
		return res
	} catch (e) {
		return { message: "Could not find user", status: 404, data: null }
	}
}

export async function generateUserByUsernameGetResponse(
	username: string
): Promise<UserApiResponse> {
	try {
		const user = await getUserByUsername(username)
		let res: UserApiResponse = {
			message: `success`,
			status: 200,
			data: user,
		}
		return res
	} catch (e) {
		return { message: "Could not find user", status: 404, data: null }
	}
}

export async function generateAllUsersGetResponse(): Promise<UsersApiResponse> {
	try {
		const users = await getAllUsers()
		let res: UsersApiResponse = {
			message: `success`,
			status: 200,
			data: users,
		}
		return res
	} catch (e) {
		return { message: "Could not find users", status: 404, data: [] }
	}
}
