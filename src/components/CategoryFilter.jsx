import { CATEGORIES } from "../utils/expenses.js";

// Props: value is the active category and onChange updates it; this component has no local state.
export default function CategoryFilter({ value, onChange }) {
  return (
    <div className="field filter-field">
      <label htmlFor="category-filter">Filter by category</label>
      <select
        id="category-filter"
        data-cy="filter"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="All">All categories</option>
        {CATEGORIES.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}
