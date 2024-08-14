import dotenv from "dotenv"
import express from "express"

dotenv.config()

const PORT = process.env.PORT

const app = express()

app.get("/", (request, response) => {
  return response.json({ message: "Está OK" })
})

app.listen(PORT, () => console.log(`Server created at: http://localhost:${PORT}`))
