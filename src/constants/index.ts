enum LoanTypes {
  Personal = "PERSONAL_LOAN",
  Guaranteed = "GUARANTEED_LOAN",
  CONSIGNMENT = "CONSIGNMENT_LOAN",
}

export const LoansInterestRates = {
  [LoanTypes.Personal]: 0.04,
  [LoanTypes.Guaranteed]: 0.03,
  [LoanTypes.CONSIGNMENT]: 0.02,
}

// The interest rates are being using in a decimal format to maintain the consistency and turn easy the calculus.
// 0.04 = 4% - 0.03 = 3% - 0.02 = 2%
