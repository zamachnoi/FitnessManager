const port = process.env.DB_PORT || 5432
const pgPassword = process.env.DB_PASSWORD || "test"
const config: { [key: string]: { connectionString: string } } = {
	development: {
		connectionString: `postgres://postgres:test@localhost:${port}/postgres`,
	},
	production: {
		connectionString:
			`postgres://postgres:${pgPassword}@localhost:${port}/postgres` ||
			process.env.DATABASE_URL ||
			"",
	},
}

// Use NODE_ENV to determine which settings to export
const env = process.env.NODE_ENV || "development" // Default to 'development' if NODE_ENV is not set
export const dbConfig = config[env]
