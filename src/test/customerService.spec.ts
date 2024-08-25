import { describe, expect, jest } from "@jest/globals"
import express, {Request, Response} from "express"
import request from "supertest"
import { createCustomer, getAllCustomers, getCustomerByID } from "../services/customerService"
import { CustomerInfo } from "../types/index"

jest.setTimeout(8000)

const app = express()

app.use(express.json())

app.post("/create-customer", async (request: Request, response: Response) => {
  try {
    const customerData = request.body

    if (Object.keys(customerData).length === 0) {
      return response.status(400).json({ error: "Dados do cliente não fornecidos." })
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
})

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
  createCustomer: jest.fn(),
  getCustomerByID: jest.fn(),
  getAllCustomers: jest.fn(),
}))

describe("createCustomer", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("Should create a new customer successfully -> Status Code: 201", async () => {
    const mockNewCustomerData: Omit<CustomerInfo, "id"> = {
      name: "João Silva",
      age: 30,
      income: 3000.0,
      location: "RJ",
      cpf: "123.456.789-00",
    };

    const mockCreatedCustomer: CustomerInfo = {
      ...mockNewCustomerData,
      id: "72d739cf-bdeb-484d-a290-9e0719103c7b"
    };
    
    (createCustomer as jest.MockedFunction<typeof createCustomer>).mockResolvedValue(mockCreatedCustomer)

    const response = await request(app).post("/create-customer").send(mockNewCustomerData).expect(201)

    expect(response.body).toEqual({ customer: mockCreatedCustomer })
    expect(createCustomer).toHaveBeenCalledWith(mockNewCustomerData)
  })

  it("Should return error if customer data is empty -> Status Code: 400", async () => {
    const response = await request(app).post("/create-customer").send({}).expect(400)

    expect(response.body).toEqual({ error: "Dados do cliente não fornecidos." })
    expect(createCustomer).not.toHaveBeenCalled()
  })

  it("Should return error message saying the cpf already exists -> Status Code: 409", async () => {
    const mockNewCustomerData: Omit<CustomerInfo, "id"> = {
      name: "Maria Silva",
      age: 66,
      income: 1800.0,
      location: "PA",
      cpf: "987.654.321-00",
    };

    (createCustomer as jest.MockedFunction<typeof createCustomer>).mockRejectedValue(new Error("CPF INSERIDO JÁ EXISTE"))

    const response = await request(app).post("/create-customer").send(mockNewCustomerData).expect(409)

    expect(response.body).toEqual({ error: "CPF inserido já cadastrado." })
    expect(createCustomer).toBeCalledWith(mockNewCustomerData)
  })
})

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
    ]
    ;(getAllCustomers as jest.MockedFunction<typeof getAllCustomers>).mockResolvedValue(mockFakeCustomerList)

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