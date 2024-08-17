import { Router } from "express"
import { CustomerService, LoanService } from "../controllers/index.js"

const route: Router = Router()

route.get("/customers", CustomerService.index)
route.post("/customer-loans", LoanService.request)
route.post("/create-customer", CustomerService.create)

export default route
