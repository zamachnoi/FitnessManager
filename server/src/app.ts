import express, { Express, Request, Response, Application } from "express"
import dotenv from "dotenv"
import { defaultRoute } from "./routes/defaultRoute"
import { userRoute } from "./routes/userRoute"

//For env File
dotenv.config()

export const app: Application = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

app.use("/", defaultRoute)
app.use("/users", userRoute)

app.listen(port, () => {
	console.log(`server started at at http://localhost:${port}`)
})
