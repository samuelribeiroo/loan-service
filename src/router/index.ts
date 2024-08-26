import { Router } from "express"
import { CustomerController, LoanController } from "../controllers/index.js"

const route: Router = Router()

route.post("/create-customer", CustomerController.create)
route.get("/customers", CustomerController.index)
route.get("/customer/:id", CustomerController.show)
route.put("/update-income", CustomerController.update)
route.post("/customer-loans", LoanController.request)

export default route
