import { useState } from "react";
import CategoryFilter from "./components/CategoryFilter.jsx";
import ExpenseForm from "./components/ExpenseForm.jsx";
import ExpenseList from "./components/ExpenseList.jsx";
import { calculateTotal, formatAmount } from "./utils/expenses.js";
import "./App.css";

// Props: none; App owns the expense collection and selected category.
export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const visibleExpenses =
    activeCategory === "All"
      ? expenses
      : expenses.filter((expense) => expense.category === activeCategory);

  function addExpense(expense) {
    setExpenses((currentExpenses) => [
      ...currentExpenses,
      { ...expense, id: crypto.randomUUID() },
    ]);
  }

  function deleteExpense(id) {
    setExpenses((currentExpenses) =>
      currentExpenses.filter((expense) => expense.id !== id),
    );
  }

  return (
    <main className="app-shell">
      <header className="page-header">
        <div className="brand-mark" aria-hidden="true">
          $
        </div>
        <div>
          <p className="eyebrow">YOUR MONEY, IN FOCUS</p>
          <h1>Expense tracker</h1>
          <p className="page-subtitle">A little clarity for every dollar.</p>
        </div>
      </header>

      <section className="summary-card" aria-label="Expense summary">
        <div>
          <p className="summary-label">Total displayed</p>
          <p className="summary-total" data-cy="total" data-testid="total">
            {formatAmount(calculateTotal(visibleExpenses))}
          </p>
        </div>
        <div className="summary-count">
          <span className="count-number" data-cy="count" data-testid="count">
            {visibleExpenses.length}
          </span>
          <span className="count-label">
            {visibleExpenses.length === 1 ? "expense" : "expenses"} displayed
          </span>
        </div>
      </section>

      <section className="panel" aria-labelledby="add-heading">
        <div className="section-heading">
          <span className="section-icon" aria-hidden="true">
            +
          </span>
          <div>
            <h2 id="add-heading">Add an expense</h2>
            <p>Keep track of where it goes.</p>
          </div>
        </div>
        <ExpenseForm onAddExpense={addExpense} />
      </section>

      <section className="panel expense-panel" aria-labelledby="expenses-heading">
        <div className="list-heading">
          <div className="section-heading">
            <span className="section-icon list-icon" aria-hidden="true">
              ≡
            </span>
            <div>
              <h2 id="expenses-heading">Your expenses</h2>
              <p>Recent spending, all in one place.</p>
            </div>
          </div>
          <CategoryFilter value={activeCategory} onChange={setActiveCategory} />
        </div>
        <ExpenseList expenses={visibleExpenses} onDelete={deleteExpense} />
      </section>
      <footer className="page-footer">Small steps make a big difference.</footer>
    </main>
  );
}
