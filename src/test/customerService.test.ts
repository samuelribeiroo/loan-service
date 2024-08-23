import { describe } from "node:test"
import { expect, jest } from "@jest/globals"
import express from "express"
import request from "supertest"
import { getAllCustomers, getCustomerByID } from "../services/customerService"
import { CustomerInfo } from "../types/index"

jest.setTimeout(8000)

const app = express()

app.use(express.json())

app.get("/customers", async (request, response) => {
  try {
    const mockFakeCustomerList = await getAllCustomers()

    return response.status(200).json({ mockFakeCustomerList })
  } catch (error) {
    return response.status(500).json({ error: `Houve algum erro: ${error}` })
  }
})

app.get("/customer/:id", async (request, response) => {
  try {
    const { id } = request.params
    const customer = await getCustomerByID({ id })

    if (!customer) {
      return response.status(404).json({ error: "Cliente não encontrado" })
    }

    response.json({ customer })
  } catch (error) {
    response.status(404).json({ error: "Cliente não encontrado" })
  }
})

jest.mock("../services/customerService", () => ({
  getCustomerByID: jest.fn(),
  getAllCustomers: jest.fn(),
}))


describe("getAllCustomers", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("Should return the entire register from Postgres of costumers -> Status Code: 200", async () => {
    const mockFakeCustomerList: CustomerInfo[] = [
      {
        id: "ec0d1287-a1dd-4691-8848-10112f11d049",
        name: "Geraldo Lucca Nelson Duarte",
        age: 55,
        income: 1980.0,
        location: "MS",
        cpf: "363.757.821-20",
      },
      {
        id: "fc11fa85-419e-464d-88f5-d383f8a0174e",
        name: "Maria Silva",
        age: 30,
        income: 2500.0,
        location: "SP",
        cpf: "123.456.789-00",
      },
    ];

    (getAllCustomers as jest.MockedFunction<typeof getAllCustomers>).mockResolvedValue(mockFakeCustomerList)

    const response = await request(app).get("/customers").expect(200)

    expect(response.body).toEqual({ mockFakeCustomerList })
    expect(getAllCustomers).toHaveBeenCalled()
    expect(response.header["content-type"]).toMatch(/json/)
  })

  it("Should return an error message if there is an error fetching customers -> Status Code: 500", async () => {
   (getAllCustomers as jest.MockedFunction<typeof getAllCustomers>).mockRejectedValue(new Error("Database error."))

    const response = await request(app).get("/customers").expect(500)

    expect(response.body).toHaveProperty("error")
    expect(response.body.error).toMatch(/Houve algum erro/)
  })
})

describe("getCustomerByID", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("Should return error message if customer does not exist -> Status code: 404", async () => {
    ;(getCustomerByID as jest.MockedFunction<typeof getCustomerByID>).mockResolvedValue(null)

    const response = await request(app).get("/customer/fc11fa85-419e-464d-88f5-d383f8a0174e").expect(404)

    expect(response.body).toEqual({ error: "Cliente não encontrado" })
    expect(getCustomerByID).toHaveBeenCalledWith({ id: "fc11fa85-419e-464d-88f5-d383f8a0174e" })
  })

  it("Should return a JSON with customer -> Status code: 200", async () => {
    const mockFakeCustomer: CustomerInfo = {
      id: "ec0d1287-a1dd-4691-8848-10112f11d049",
      name: "Geraldo Lucca Nelson Duarte",
      age: 55,
      income: 1980.0,
      location: "MS",
      cpf: "363.757.821-20",
    }

    // Disclaimer about used data like name, cpf and location
    // All sensinble data used in this project are provideb by the site 'https://www.4devs.com.br/gerador_de_cpf'
    // And the main purpose of the project are learning, notthing more.
    ;(getCustomerByID as jest.MockedFunction<typeof getCustomerByID>).mockResolvedValue(mockFakeCustomer)

    const response = await request(app).get("/customer/ec0d1287-a1dd-4691-8848-10112f11d049").expect(200)

    expect(response.body).toEqual({ customer: mockFakeCustomer })
    expect(getCustomerByID).toHaveBeenCalledWith({ id: "ec0d1287-a1dd-4691-8848-10112f11d049" })
  })
})
