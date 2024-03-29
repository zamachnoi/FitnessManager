import express, { Express, Request, Response, Application } from "express"
import dotenv from "dotenv"

dotenv.config()

import { defaultRoute } from "./routes/defaultRoute"
import { userRoute } from "./routes/userRoute"
import { memberRoute } from "./routes/memberRoute"

export const app: Application = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

app.use("/", defaultRoute)
app.use("/users", userRoute)
app.use("/members", memberRoute)

app.listen(port, () => {
	console.log(`server started at at http://localhost:${port}`)
})
