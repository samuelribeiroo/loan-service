import { Query } from "../database/index.js"

export const createCustomer = async (data: { id: number, name: string, age: number, cpf: string, income: number, location: string }) => {
  const createNewCustomer = `INSERT INTO client_register (id, name, age, cpf, income, location)
  VALUES($1, $2, $3, $4, $5, $6)
  RETURNING *
  `
  const expectedValues = [data.id, data.name, data.age, data.cpf, data.income, data.location]

  const getResult = await Query(createNewCustomer, expectedValues)

  return getResult[0]
}

// to run the query above we need create a table with enitities, so for while we won't use.