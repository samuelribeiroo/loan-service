import { Router } from "express"
import { LoanService } from "../controllers/index.js"

const route: Router = Router()

route.post("/customer-loans", LoanService.request)

export default route
