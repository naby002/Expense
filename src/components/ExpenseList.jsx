import ExpenseItem from "./ExpenseItem.jsx";

// Props: expenses supplies the visible entries and onDelete handles removal; this component has no local state.
export default function ExpenseList({ expenses, onDelete }) {
  if (expenses.length === 0) {
    return (
      <p className="empty-state" data-cy="empty-state">
        No expenses to show yet. Add one to get started.
      </p>
    );
  }

  return (
    <ul className="expense-list" data-cy="expense-list" aria-label="Expenses">
      {expenses.map((expense) => (
        <ExpenseItem key={expense.id} expense={expense} onDelete={onDelete} />
      ))}
    </ul>
  );
}
