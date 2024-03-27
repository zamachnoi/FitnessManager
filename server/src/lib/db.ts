import { Kysely, PostgresDialect } from "kysely"
import { DB } from "../models/db/types"
import { Pool } from "pg"
import { dbConfig } from "../config/dbConfig"

export const db = new Kysely<DB>({
	dialect: new PostgresDialect({
		pool: new Pool({
			connectionString: dbConfig.connectionString,
		}),
	}),
})

async function fetchData() {
	const rows = await db.selectFrom("users").execute()
	// Process the fetched data here
}

fetchData()
