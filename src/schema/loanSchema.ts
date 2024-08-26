import { z } from "zod"

export const loanSchema = z.object({
  customer: z.string(),
  loans: z.object({
    type: z.string(),
    interest_rate: z.number().nonnegative(),
  }),
})