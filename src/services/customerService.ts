import { Query } from "../database/index.js"

export const createCustomer = async (data: { name: string; age: number; cpf: string; income: number; location: string }) => {
  const createNewCustomer = await `INSERT INTO clients_resgister (name, age, number, cpf, income, location)
  VALUES($1, $2, $3, $4, $5)
  RETURNING *
  `
  const expectedValues = [data.name, data.age, data.cpf, data.income, data.location]

  const getResult = await Query(createNewCustomer, expectedValues)

  return getResult[0]
}

// to run the query above we need create a table with enitities, so for while we won't use.