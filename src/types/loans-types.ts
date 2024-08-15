export type LoanServcice = "PERSONAL" | "GUARANTEED" | "ASSIGNED"

export type LoanReport = {
  customer: string
  loans: Array<{
    type: LoanServcice,
    interest_rate: number
  }>
}
