import dotenv from "dotenv"

dotenv.config()

import express, { Application } from "express"
import cors from "cors"
import session from "express-session"

import { defaultRoute } from "./routes/defaultRoute"
import { userRoute } from "./routes/userRoute"
import { memberRoute } from "./routes/memberRoute"
import { memberGoalRoute } from "./routes/memberGoalsRoute"
import { memberHealthStatsRoute } from "./routes/memberHealthStatsRoute"
import { routineRoute } from "./routes/routineRoute"

export const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(
	cors({
		origin: "http://localhost:3001",
		credentials: true,
	})
)

const authEnabled = process.env.AUTH === "true" || false

if (authEnabled) {
	app.use(
		session({
			secret: process.env.SESSION_SECRET || "secretkey123", // Secret used to sign the session ID cookie
			resave: false, // Avoids resaving session if not modified
			saveUninitialized: false, // Does not save uninitialized sessions
			cookie: {
				secure: false, // TRUE in production (with HTTPS), FALSE in development
				httpOnly: true, // Helps mitigate the risk of client side script accessing the protected cookie
				maxAge: 1000 * 60 * 60 * 24, // Example: sets cookie to expire in 1 day
			},
		})
	)
}

// ROUTES
app.use("/", defaultRoute)
app.use("/users", userRoute)
app.use("/members", memberRoute)
app.use("/members", memberGoalRoute)
app.use("/members", memberHealthStatsRoute)
app.use("/routines", routineRoute)


const port = process.env.PORT || 8000

app.listen(port, () => {
	console.log(`server started at at http://localhost:${port}`)
})
