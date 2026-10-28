import { describe, expect, it } from "vitest";
import {
  calculateTotal,
  CATEGORIES,
  formatAmount,
  MAX_EXPENSE_AMOUNT,
  validateExpense,
} from "./expenses.js";

describe("validateExpense", () => {
  it("trims a title and converts a numeric string to a number", () => {
    expect(
      validateExpense({ title: "  Lunch  ", amount: "250", category: "Food" }),
    ).toEqual({
      valid: true,
      expense: { title: "Lunch", amount: 250, category: "Food" },
    });
  });

  it.each(["", "   ", null])("rejects an empty title: %s", (title) => {
    expect(validateExpense({ title, amount: "10", category: "Bills" })).toMatchObject({
      valid: false,
      field: "title",
    });
  });

  it.each(["abc", "", "Infinity", NaN])("rejects a non-numeric amount: %s", (amount) => {
    expect(
      validateExpense({ title: "Coffee", amount, category: "Food" }),
    ).toMatchObject({ valid: false, field: "amount" });
  });

  it.each(["0", "-1", -0.01])("rejects a non-positive amount: %s", (amount) => {
    expect(
      validateExpense({ title: "Coffee", amount, category: "Food" }),
    ).toMatchObject({ valid: false, field: "amount" });
  });

  it("accepts the maximum allowed amount", () => {
    expect(
      validateExpense({
        title: "Annual bill",
        amount: MAX_EXPENSE_AMOUNT,
        category: "Bills",
      }).valid,
    ).toBe(true);
  });

  it("rejects amounts over 100000", () => {
    expect(
      validateExpense({
        title: "Annual bill",
        amount: MAX_EXPENSE_AMOUNT + 0.01,
        category: "Bills",
      }),
    ).toMatchObject({ valid: false, field: "amount" });
  });

  it("accepts each supported category", () => {
    for (const category of CATEGORIES) {
      expect(
        validateExpense({ title: "Expense", amount: "1", category }).valid,
      ).toBe(true);
    }
  });

  it("rejects an unsupported category", () => {
    expect(
      validateExpense({ title: "Expense", amount: "1", category: "Shopping" }),
    ).toMatchObject({ valid: false, field: "category" });
  });
});

describe("expense calculations", () => {
  it("calculates the sum of expense amounts", () => {
    expect(
      calculateTotal([
        { amount: 250 },
        { amount: 400 },
        { amount: 19.5 },
      ]),
    ).toBe(669.5);
  });

  it("returns zero for an empty list", () => {
    expect(calculateTotal([])).toBe(0);
  });

  it("formats values with exactly two decimal places", () => {
    expect(formatAmount(10)).toBe("10.00");
    expect(formatAmount(10.5)).toBe("10.50");
    expect(formatAmount(10.567)).toBe("10.57");
  });
});
