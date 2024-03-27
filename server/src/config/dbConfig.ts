const config: { [key: string]: { connectionString: string } } = {
	development: {
		connectionString: "postgres://postgres:test@localhost:5432/postgres",
	},
	production: {
		connectionString: process.env.DATABASE_URL || "", // Assuming this is set in your production environment
	},
}

// Use NODE_ENV to determine which settings to export
const env = process.env.NODE_ENV || "development" // Default to 'development' if NODE_ENV is not set
export const dbConfig = config[env]
