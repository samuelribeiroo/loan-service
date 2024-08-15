import dotenv from "dotenv"
import express from "express"
import route from "./router/index.js"

dotenv.config()

const PORT = process.env.PORT

const app = express()

app.use(express.json())

app.use(route)

app.listen(PORT, () => console.log(`Server created at: http://localhost:${PORT}`))
