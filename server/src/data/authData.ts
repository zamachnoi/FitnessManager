import { db } from "../lib/db"
import { RegisterApiRequest, AccountData } from "../models/io/authIo"

export default async function createAccount(
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
	}

	if (type === "Trainer") {
		await db
			.insertInto("trainers")
			.values({
				trainer_id: user.user_id,
			})
			.execute()
	}

	return user
}
