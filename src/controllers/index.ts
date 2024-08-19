import { Request, Response } from "express"
import { customerSchema } from "../schema/customerSchema.js"
import { createCustomer, getAllCustomers } from "../services/customerService.js"
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
      if (error instanceof Error) {
        if (error.message === "CPF INSERIDO JÁ EXISTE") {
          return response.sendStatus(409).json({ error: 'CPF inserido já cadastrado.' })
        } else {
          return response.json({ message: error.message })
        }
      } else {
        return response.status(500).json({ message: "Erro desconhecido." })
      }
    }
  }

  async index(request: Request, response: Response) {
    try {
      const costumersList = await getAllCustomers()

      return response.json({ costumersList }).sendStatus(200)
    } catch (error) {
      return response.json({ error: `Houve algum erro: ${error}` })
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
