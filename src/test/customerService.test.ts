import { expect } from "@jest/globals"

function getSum(a: number, b: number) {
  return a + b
}

it("", () => {
  expect(getSum(2, 2)).toBe(4)
})
