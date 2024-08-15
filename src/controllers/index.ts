import { Request, Response } from "express"
import { customerSchema } from "../schema/customerSchema.js"
import { handleDetermineLoan } from "../services/loanService.js"

class Loan {
  async request(request: Request, response: Response) {
    const validator = customerSchema.safeParse(request.body)

    if (!validator.success) {
      return response.sendStatus(400).json({ errors: validator.error.errors })
    }

    const customer = validator.data

    const loans = handleDetermineLoan(customer)

    return response.json({ customer: customer.name, loans }).sendStatus(200)
  }
}

export const LoanService = new Loan()
