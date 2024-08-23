export type LoanService = "PERSONAL" | "GUARANTEED" | "CONSIGNMENT"

export type LoanReport = {
  customer: string
  loans: Array<{
    type: LoanService,
    interest_rate: number
  }>
}
