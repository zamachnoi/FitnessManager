import dotenv from "dotenv"

dotenv.config()

import express, { Application, Request, Response, NextFunction } from "express"
import cors from "cors"
import session from "express-session"

import { defaultRoute } from "./routes/defaultRoute"
import { userRoute } from "./routes/userRoute"
import { memberRoute } from "./routes/memberRoute"
import { memberGoalRoute } from "./routes/memberGoalsRoute"
import { memberHealthStatsRoute } from "./routes/memberHealthStatsRoute"
import { classesRoute } from "./routes/classesRoute"
import { trainerRoute } from "./routes/trainersRoute"
import { routineRoute } from "./routes/routineRoute"
import { memberBookingRoute } from "./routes/memberBookingRoute"
import { roomRoute } from "./routes/roomRoute"
import { paymentRoute } from "./routes/paymentsRoute"
import { exerciseRoute } from "./routes/exerciseRoute"
import { authRoute } from "./routes/authRoute"
import { equipmentRoute } from "./routes/equipmentRoute"
import {
	applyMiddlewareToRoutesStartingWith,
	ensureAuthenticated,
	excludeGetRequests,
} from "./middleware/auth"
import { memberViewRoute } from "./routes/memberViewRoute"
export const authEnabled = process.env.AUTH === "true"
export const app: Application = express()

declare module "express-session" {
	export interface SessionData {
		user: {
			user_id: number
			type: "Member" | "Trainer" | "Admin"
			authenticated: boolean
		}
	}
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
)

if (authEnabled) {
	app.use(
		session({
			secret: process.env.SESSION_SECRET || "secretkey123", // Secret used to sign the session ID cookie
			resave: false, // Avoids resaving session if not modified
			saveUninitialized: true,
			cookie: {
				secure: false, // TRUE in production (with HTTPS), FALSE in development
				httpOnly: true, // Helps mitigate the risk of client side script accessing the protected cookie
				sameSite: "lax",
				maxAge: 1000 * 60 * 60 * 24, // Example: sets cookie to expire in 1 day
			},
		})
	)

	const protectedNonGetMiddleware = applyMiddlewareToRoutesStartingWith(
		["/members", "/admins", "/trainers"],
		excludeGetRequests(ensureAuthenticated)
	)

	app.use(protectedNonGetMiddleware)

	app.use("/auth", authRoute)
}

// ROUTES
app.use("/", defaultRoute)
app.use("/users", userRoute)
app.use("/members", memberRoute)
app.use("/members", memberGoalRoute)
app.use("/members", memberHealthStatsRoute)
app.use("/members", memberBookingRoute)
app.use("/trainers", trainerRoute)
app.use("", routineRoute)
app.use("", equipmentRoute)
app.use("/rooms", roomRoute)
app.use("/exercises", exerciseRoute)
app.use("/classes", classesRoute)
app.use("/admin/payments", paymentRoute)
app.use("/trainers", memberViewRoute)

const port = process.env.PORT || 3000

app.listen(port, () => {
	console.log(`server started at at http://localhost:${port}`)
})
