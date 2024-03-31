import express, { Express, Request, Response, Application } from "express"
import dotenv from "dotenv"

dotenv.config()

import { defaultRoute } from "./routes/defaultRoute"
import { userRoute } from "./routes/userRoute"
import { memberRoute } from "./routes/memberRoute"
import { memberGoalRoute } from "./routes/memberGoalsRoute"
import { memberHealthStatsRoute } from "./routes/memberHealthStatsRoute"
import { trainerRoute } from "./routes/trainersRoute"

export const app: Application = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

// ROUTES
app.use("/", defaultRoute)
app.use("/users", userRoute)
app.use("/members", memberRoute)
app.use("/members", memberGoalRoute)
app.use("/members", memberHealthStatsRoute)
app.use("/trainers",trainerRoute)

app.listen(port, () => {
	console.log(`server started at at http://localhost:${port}`)
})
