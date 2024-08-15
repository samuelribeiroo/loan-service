import { LoansInterestRates } from "../constants/index.js"
import { CustomerInfo, LoanServcice } from "../types/index.js"

interface LoanRule {
  condition: (customer: CustomerInfo) => boolean
  loanType: LoanServcice
  interestRate: number
}

const handleDetermineLoan = (customer: CustomerInfo) => {
  const getLocationCustomer = customer.location.toLowerCase()

  const isIncomeElegible = customer.income > 3000 && customer.income <= 5000

  const loanRulesMatcher: LoanRule[] = [
    {
      condition: customer => customer.income <= 3000,
      loanType: "PERSONAL",
      interestRate: LoansInterestRates.PERSONAL_LOAN,
    },
    {
      condition: customer => customer.income <= 3000,
      loanType: "GUARANTEED",
      interestRate: LoansInterestRates.GUARANTEED_LOAN,
    },
    {
      condition: customer => customer.income >= 5000,
      loanType: "CONSIGNMENT",
      interestRate: LoansInterestRates.CONSIGNMENT_LOAN,
    },
    {
      condition: customer => isIncomeElegible && customer.age < 30 && getLocationCustomer === "sp",
      loanType: "PERSONAL",
      interestRate: LoansInterestRates.PERSONAL_LOAN,
    },
    {
      condition: customer => isIncomeElegible && customer.age < 30 && getLocationCustomer === "sp",
      loanType: "GUARANTEED",
      interestRate: LoansInterestRates.GUARANTEED_LOAN,
    },
  ]
}
