import { db } from "../lib/db"
import { UserDbRow } from "../models/io/userIo"

async function removePassword(
	user: UserDbRow
): Promise<Omit<UserDbRow, "password">> {
	const { password, ...userWithoutPassword } = user
	return userWithoutPassword
}

export async function getUserById(
	id: number
): Promise<Omit<UserDbRow, "password">> {
	const user = await db
		.selectFrom("users")
		.where("user_id", "=", id)
		.selectAll()
		.executeTakeFirst()

	if (!user) {
		throw new Error("No user found")
	}

	return removePassword(user)
}

export async function getUserByUsername(
	username: string
): Promise<Omit<UserDbRow, "password">> {
	const user = await db
		.selectFrom("users")
		.where("username", "=", username)
		.selectAll()
		.executeTakeFirst()

	if (!user) {
		throw new Error("No user found")
	}

	return removePassword(user)
}

export async function getAllUsers(): Promise<Omit<UserDbRow, "password">[]> {
	const users = await db.selectFrom("users").selectAll().execute()
	return await Promise.all(users.map(removePassword))
}
