export type LoanServcice = "PERSONAL" | "GUARANTEED" | "CONSIGNMENT"

export type LoanReport = {
  customer: string
  loans: Array<{
    type: LoanServcice,
    interest_rate: number
  }>
}
