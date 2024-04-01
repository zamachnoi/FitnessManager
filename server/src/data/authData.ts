import { db } from "../lib/db"
import {
	RegisterApiRequest,
	AccountData,
	LoginApiRequest,
} from "../models/io/authIo"

export async function createAccount(
	regDetails: RegisterApiRequest
): Promise<AccountData> {
	const { username, password, first_name, last_name, type } = regDetails
	const user = await db
		.insertInto("users")
		.values({
			username,
			password,
			first_name,
			last_name,
			type,
		})
		.returningAll()
		.executeTakeFirstOrThrow()

	if (type === "Member") {
		await db
			.insertInto("members")
			.values({
				member_id: user.user_id,
			})
			.execute()
	} else if (type === "Trainer") {
		await db
			.insertInto("trainers")
			.values({
				trainer_id: user.user_id,
			})
			.execute()
	} else if (type === "Admin") {
		await db
			.insertInto("admins")
			.values({
				admin_id: user.user_id,
			})
			.execute()
	}

	return user
}

export async function login(
	loginDetails: LoginApiRequest
): Promise<AccountData> {
	const { username, password } = loginDetails
	const user = await db
		.selectFrom("users")
		.where("username", "=", username)
		.where("password", "=", password)
		.selectAll()
		.executeTakeFirstOrThrow()

	return user
}
