import { useState } from "react";
import { CATEGORIES, validateExpense } from "../utils/expenses.js";

// Props: onAddExpense receives validated expense data; local state tracks the form and errors.
export default function ExpenseForm({ onAddExpense }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [error, setError] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    const result = validateExpense({ title, amount, category });

    if (!result.valid) {
      setError(result);
      return;
    }

    onAddExpense(result.expense);
    setTitle("");
    setAmount("");
    setCategory(CATEGORIES[0]);
    setError(null);
  }

  return (
    <form className="expense-form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="expense-title">Title</label>
        <input
          id="expense-title"
          data-cy="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          aria-required="true"
          aria-invalid={error?.field === "title"}
          aria-describedby={error?.field === "title" ? "expense-error" : undefined}
          placeholder="e.g. Weekly groceries"
        />
      </div>
      <div className="field">
        <label htmlFor="expense-amount">Amount</label>
        <input
          id="expense-amount"
          data-cy="amount"
          type="number"
          inputMode="decimal"
          step="any"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          aria-required="true"
          aria-invalid={error?.field === "amount"}
          aria-describedby={error?.field === "amount" ? "expense-error" : undefined}
          placeholder="0.00"
        />
      </div>
      <div className="field">
        <label htmlFor="expense-category">Category</label>
        <select
          id="expense-category"
          data-cy="category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          {CATEGORIES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <button className="primary-button add-button" data-cy="add-expense" type="submit">
        Add expense
      </button>
      {error && (
        <p className="form-error" id="expense-error" role="alert">
          {error.message}
        </p>
      )}
    </form>
  );
}
