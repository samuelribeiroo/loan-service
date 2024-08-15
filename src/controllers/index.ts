import { Request, Response } from "express"
import { handleDetermineLoan } from "../services/loanService.js"

class Loan {
  async request(request: Request, response: Response) {
    const customer = request.body

    const loans = handleDetermineLoan(customer)

    return response.json({ customer: customer.name, loans })
  }
}

export const LoanService = new Loan()
