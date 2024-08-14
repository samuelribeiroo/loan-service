import dotenv from "dotenv"
import express from "express"
import route from "./router"

dotenv.config()

const PORT = process.env.PORT

const app = express()

app.use(route)

app.listen(PORT, () => console.log(`Server created at: http://localhost:${PORT}`))
