import { Router } from "express"

const route: Router = Router()

route.get("/", (request, response) => {
  return response.json({ message: "Funcionou, porra!!!" })
})

export default route
