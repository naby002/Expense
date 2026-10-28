import { formatAmount } from "../utils/expenses.js";

// Props: expense supplies the displayed data and onDelete removes it; this component has no local state.
export default function ExpenseItem({ expense, onDelete }) {
  return (
    <li className="expense-row" data-cy="expense-item">
      <div className="expense-description">
        <span className="expense-title">{expense.title}</span>
        <span className="category-badge">{expense.category}</span>
      </div>
      <span className="expense-amount">{formatAmount(expense.amount)}</span>
      <button
        className="delete-button"
        type="button"
        data-cy="delete-expense"
        aria-label={`Delete ${expense.title}`}
        onClick={() => onDelete(expense.id)}
      >
        Delete
      </button>
    </li>
  );
}
