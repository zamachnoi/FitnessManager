import { db } from "../lib/db"
import { UserData } from "../models/io/userIo"
import * as util from "./dataUtil"

export async function getUserById(
	id: number
): Promise<Omit<UserData, "password">> {
	const user = await db
		.selectFrom("users")
		.where("user_id", "=", id)
		.selectAll()
		.executeTakeFirst()

	if (!user) {
		throw new Error("No user found")
	}

	return util.removePassword(user)
}

export async function getUserByUsername(
	username: string
): Promise<Omit<UserData, "password">> {
	const user = await db
		.selectFrom("users")
		.where("username", "=", username)
		.selectAll()
		.executeTakeFirst()

	if (!user) {
		throw new Error("No user found")
	}

	return util.removePassword(user)
}

export async function getAllUsers(): Promise<Omit<UserData, "password">[]> {
	const users = await db.selectFrom("users").selectAll().execute()
	return await Promise.all(users.map(util.removePassword))
}
