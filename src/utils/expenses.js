export const CATEGORIES = ["Food", "Travel", "Bills", "Other"];
export const MAX_EXPENSE_AMOUNT = 100000;

export function validateExpense({ title, amount, category }) {
  const cleanedTitle = typeof title === "string" ? title.trim() : "";
  if (!cleanedTitle) {
    return { valid: false, field: "title", message: "Enter an expense title." };
  }

  const numericAmount = typeof amount === "number" ? amount : Number(amount);
  if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
    return {
      valid: false,
      field: "amount",
      message: "Enter an amount greater than 0.",
    };
  }
  if (numericAmount > MAX_EXPENSE_AMOUNT) {
    return {
      valid: false,
      field: "amount",
      message: `Amount must be ${MAX_EXPENSE_AMOUNT.toLocaleString()} or less.`,
    };
  }
  if (!CATEGORIES.includes(category)) {
    return {
      valid: false,
      field: "category",
      message: "Choose a valid category.",
    };
  }

  return {
    valid: true,
    expense: { title: cleanedTitle, amount: numericAmount, category },
  };
}

export function calculateTotal(expenses) {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
}

export function formatAmount(amount) {
  return amount.toFixed(2);
}
