"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
const port = process.env.DB_PORT || 5432;
const config = {
    development: {
        connectionString: `postgres://postgres:test@localhost:${port}/postgres`,
    },
    production: {
        connectionString: process.env.DATABASE_URL || "", // Assuming this is set in your production environment
    },
};
// Use NODE_ENV to determine which settings to export
const env = process.env.NODE_ENV || "development"; // Default to 'development' if NODE_ENV is not set
exports.dbConfig = config[env];
