import { ifError } from "assert"
import { Query } from "../database/index.js"

export const createCustomer = async (data: {
  name: string
  age: number
  cpf: string
  income: number
  location: string
}) => {
  try {
    const cpfExistQuery = `SELECT COUNT(*) FROM client_register WHERE cpf = $1`
    const result = await Query(cpfExistQuery, [data.cpf])

    if (result[0].count > 0) {
      throw new Error("CPF INSERIDO JÁ EXISTE")
    }

    const createNewCustomer = `INSERT INTO client_register (name, age, cpf, income, location)
  VALUES($1, $2, $3, $4, $5)
  RETURNING *
  `
    const expectedValues = [data.name, data.age, data.cpf, data.income, data.location]

    const getResult = await Query(createNewCustomer, expectedValues)

    return getResult[0]
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Erro ao criar cliente.")
    } else {
      throw new Error("Erro desconhecido ao criar cliente.")
    }
  }
}

export const getAllCustomers = async () => {
  const getCustomerQuery = `SELECT * FROM client_register`

  try {
    const handleGetcustomers = Query(getCustomerQuery, [])

    return handleGetcustomers
  } catch (error) {
    console.log(`Houve algum erro: ${error}`)
  }
}

export const getCustomerByID = async (data: { id: string }) => {
  try {
    const getCustomer = "SELECT * FROM client_register WHERE id = $1"

    const execQuery = await Query(getCustomer, [data.id])

    if (execQuery.length === 0) {
      throw new Error("Cliente não localizado.")
    }

    return execQuery[0]
  } catch (error) {
    if (error instanceof Error) {
      if ((error.message = "Cliente não localizado")) {
        throw new Error(error.message)
      } else {
        throw new Error("Erro desconhecido ao buscar cliente por ID.")
      }
    } else {
      throw new Error("Erro desconhecido ao buscar cliente por ID.")
    }
  }
}
