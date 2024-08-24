import { z } from "zod"

export const customerSchema = z.object({
  name: z.string(),
  age: z.number().int().min(18),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
    message: "O CPF inserido deve atender o seguinte formato de caracteres: 000.000.000-00",
  }),
  income: z.number().nonnegative(),
  location: z.string().min(2),
})
