import express, { Express, Request, Response, Application } from "express"
import dotenv from "dotenv"

//For env File
dotenv.config()

const app: Application = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

app.get("/", (req: Request, res: Response) => {})

app.listen(port, () => {
	console.log(`server started at at http://localhost:${port}`)
})
