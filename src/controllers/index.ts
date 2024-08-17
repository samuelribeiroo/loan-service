import { Request, Response } from "express"
import { customerSchema } from "../schema/customerSchema.js"
import { createCustomer } from "../services/customerService.js"
import { handleLoanRequest } from "../services/loanService.js"

class Customer {
  async create(request: Request, response: Response) {
    try {
      const customerData = request.body
      if (request.body === "") {
        return response.sendStatus(400)
      }
      const newCustomer = await createCustomer(customerData)
      return response.sendStatus(201).json({ customer: newCustomer })
    } catch (error) {
      console.log(error)
    }
  }
}

class Loan {
  async request(request: Request, response: Response) {
    const validator = customerSchema.safeParse(request.body)

    if (!validator.success) {
      return response.sendStatus(400).json({ errors: validator.error.errors })
    }

    const customer = validator.data

    const loans = handleLoanRequest(customer)

    return response.json({ customer: customer.name, loans }).sendStatus(200)
  }
}

export const CustomerService = new Customer()
export const LoanService = new Loan()
