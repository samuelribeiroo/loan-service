import { describe, expect, jest } from "@jest/globals"
import express, { Request, Response } from "express"
import request from "supertest"
import { LoansInterestRates } from "../constants"
import { customerSchema } from "../schema/customerSchema"
import { handleLoanRequest } from "../services/loanService"

jest.setTimeout(8000)

const app = express()

app.use(express.json())

app.post("/customer-loans", async (request: Request, response: Response) => {
  const validator = customerSchema.safeParse(request.body)

  if (!validator.success) {
    return response.status(404).json({ errors: validator.error.errors }) 
  }

  const customer = validator.data

  const customerWithoutID = {
    ...customer,
  } as Omit<typeof customer, "id">

  const loans = handleLoanRequest(customerWithoutID)

  return response.status(200).json({ customer: customer.name, loans })
})

jest.mock("../services/loanService", () => ({
  handleLoanRequest: jest.fn(),
}))

describe("handleLoanRequest", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("Should return status code 404 if customer data its invalid", async () => {
    const mockInvalidCustomer = {
      name: "John Doe",
      age: "invalid",
      income: "invalid",
      location: 123
    }

    const response = await request(app).post('/customer-loans').send(mockInvalidCustomer)

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('errors')
  })

  it("Should return GUARANTEED loans", async () => {
    const mockCustomer = {
      age: 26,
      cpf: "275.484.389-23",
      name: "Vuxaywua Zukiagou",
      income: 7000.0,
      location: "SP",
    }

    ;(handleLoanRequest as jest.Mock).mockReturnValue([
      { type: "GUARANTEED", interestRate: LoansInterestRates.GUARANTEED_LOAN },
    ])

    const response = await request(app).post("/customer-loans").send(mockCustomer)

    expect(response.status).toBe(200)
    expect(handleLoanRequest).toBeCalledWith(mockCustomer)
    expect(response.body).toEqual({
      customer: mockCustomer.name,
      loans: [{ type: "GUARANTEED", interestRate: LoansInterestRates.GUARANTEED_LOAN }],
    })
  })

  // it('Should return PERSONAL and GUARANTEED loans for customer with income <= 3000', async () => {})
})
