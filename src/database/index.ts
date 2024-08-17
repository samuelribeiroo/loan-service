import { config } from "dotenv"
import pg from "pg"

const { Pool } = pg

config()

const client = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: "localhost",
  port: 5432,
  database: "clients",
})

client.connect()

export async function Query(query: string, values: any[]): Promise<any[]> {
  try {
    const { rows } = await client.query(query, values)

    return rows
  } catch (error) {
    console.log(`Houve um erro: ${error}`)
    throw new Error()
  }
}
