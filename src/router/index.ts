import { Router } from "express"
import { CustomerController, LoanController } from "../controllers/index.js"

const route: Router = Router()

route.get("/customers", CustomerController.index)
route.get("/customer/:id", CustomerController.show)
route.post("/customer-loans", LoanController.request)
route.post("/create-customer", CustomerController.create)

export default route
