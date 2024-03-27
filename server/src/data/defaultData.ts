import { db } from "../lib/db"
import { GetUserDbRow } from "../models/io/defaultIo"

export async function getDefaultDbData(): Promise<GetUserDbRow> {
	const user = await db.selectFrom("users").selectAll().executeTakeFirst()

	if (!user) {
		throw new Error("No user found")
	}

	return user
}
