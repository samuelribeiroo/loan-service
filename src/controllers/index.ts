import { Request, Response } from "express"
import { customerSchema } from "../schema/customerSchema.js"
import { createCustomer, getAllCustomers, getCustomerByID, updateIncomeCustomer } from "../services/customerService.js"
import { handleLoanRequest } from "../services/loanService.js"

class Customer {
  async create(request: Request, response: Response) {
    try {
      const customerData = request.body

      const hasEmptyProperties = Object.keys(request.body).length === 0

      if (!request.body || hasEmptyProperties) {
        return response.sendStatus(400)
      }

      const newCustomer = await createCustomer(customerData)

      return response.status(201).json({ customer: newCustomer })
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "CPF INSERIDO JÁ EXISTE") {
          return response.status(409).json({ error: "CPF inserido já cadastrado." })
        } else {
          return response.status(500).json({ error: error.message })
        }
      } else {
        return response.status(500).json({ error: "Erro desconhecido." })
      }
    }
  }

  async index(request: Request, response: Response) {
    try {
      const costumersList = await getAllCustomers()

      return response.status(200).json({ costumersList })
    } catch (error) {
      return response.json({ error: `Houve algum erro: ${error}` })
    }
  }

  async show(request: Request, response: Response) {
    try {
      const { id } = request.params
      const customer = await getCustomerByID({ id })

      if (!customer) {
        return response.status(404).json({ error: "Cliente não encontrado" })
      }

      return response.json({ customer }).status(200)
    } catch (error) {
      return response.status(404).json({ error: "Cliente não encontrado" })
    }
  }

  async update(request: Request, response: Response) {
    const { income, id} = request.body

    if (!id || typeof income !== "number") {
      return response.status(400).json({ error: "Os campos ID e income devem estar preenchidos." })
    }

    try {
      const execUpdate = await updateIncomeCustomer({ id, income })

      if (!execUpdate) {
        return response.status(400).json({ errot: "Cliente não encontrado" })
      }

      return response.status(200).json({ customer: execUpdate })
    } catch (error) {
      return response.status(500).json({ error })
    }
  }
}

class Loan {
  async request(request: Request, response: Response) {
    const validator = customerSchema.safeParse(request.body)

    if (!validator.success) {
      return response.status(400).json({ errors: validator.error.errors })
    }

    const customer = validator.data

    const customerWithoutID = {
      ...customer,
    } as Omit<typeof customer, "id">

    const loans = handleLoanRequest(customerWithoutID)

    return response.status(200).json({ customer: customer.name, loans })
  }
}

export const CustomerController = new Customer()
export const LoanController = new Loan()
