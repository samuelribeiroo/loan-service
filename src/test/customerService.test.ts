import { expect, jest } from "@jest/globals"
import express from "express"
import request from "supertest"
import { getCustomerByID } from "../services/customerService"
import { CustomerInfo } from "../types/index"

jest.setTimeout(8000)

const app = express()

app.use(express.json())

jest.mock("../services/customerService", () => ({
  getCustomerByID: jest.fn(),
}))

app.get("/customer/:id", async (request, response) => {
  try {
    const { id } = request.params
    const customer = await getCustomerByID({ id })

    response.json({ customer })
  } catch (error) {
    response.sendStatus(404).json({ error: "erro" })
  }
})

describe("getUserById", () => {
  it("Should return a JSON with user -> Status code: 200", async () => {
    const mockFakeCustomer: CustomerInfo = {
      id: "ec0d1287-a1dd-4691-8848-10112f11d049",
      name: "Geraldo Lucca Nelson Duarte",
      age: 55,
      income: 1980.0,
      location: "MS",
      cpf: "363.757.821-20",
    }; 

    // Disclaimer about used data like name, cpf and location
    // All sensinble data used in this project are provideb by the site 'https://www.4devs.com.br/gerador_de_cpf'
    // And the main purpose of the project are learning, notthing more.

    (getCustomerByID as jest.MockedFunction<typeof getCustomerByID>).mockResolvedValue(mockFakeCustomer)

    const response = await request(app).get("/customer/ec0d1287-a1dd-4691-8848-10112f11d049").expect(200)

    expect(response.body).toEqual({ customer: mockFakeCustomer })
    expect(getCustomerByID).toHaveBeenCalledWith({ id: "ec0d1287-a1dd-4691-8848-10112f11d049" })
  })
})
