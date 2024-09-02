import dotenv from "dotenv"
import express from "express"
import { ErrorRequestHandler, NextFunction, Request, Response } from "express"
import 'express-async-errors'
import route from "./router/index.js"

dotenv.config()

const PORT = process.env.PORT

const app = express()

app.use(express.json())

app.use(route)

app.use((error: ErrorRequestHandler, request: Request, response: Response, next: NextFunction) => {
  console.log(error) 
  
  // Consider update console.log to a real service log monitor like winston by example...
  // this handler up now isnt working bc express by default dont know how to handle with async methods and call error handle
  // to finish its necessary install a sample lib called: express-async-error e make the import at the main file
  // is a normal import without save any variable only import 
  return response.sendStatus(500)
})

app.listen(PORT, () => console.log(`Server created at: http://localhost:${PORT}`))
