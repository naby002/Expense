# Prompt library

## New feature

**Context:** [Describe the relevant stack, files, and existing behavior.]
**Goal:** [Describe one feature.]
**Constraints:** [State scope, conventions, compatibility, and files that must not change.]
**Acceptance criteria:** [List observable outcomes, each checkable by a test.]
**Examples:** [Give representative inputs and expected outputs.]

## Bug fix

**Context:** [Describe the affected area and current behavior.]
**Goal:** [State the incorrect behavior and desired behavior.]
**Constraints:** [Keep the fix focused; preserve unrelated behavior.]
**Acceptance criteria:** [List regression tests and outcomes.]
**Examples:** [Give a minimal reproduction and expected result.]

## Refactor

**Context:** [Describe the code and its callers.]
**Goal:** [State the structural improvement without changing behavior.]
**Constraints:** [Preserve public APIs, output, and existing conventions.]
**Acceptance criteria:** [List tests and checks that demonstrate no behavior change.]
**Examples:** [Show a before/after shape if useful.]

## Generate tests

**Context:** [Identify the module/component and its contract.]
**Goal:** [Cover specified behaviors and relevant edge cases.]
**Constraints:** [Use the existing test runner and testing conventions; do not change production code.]
**Acceptance criteria:** [Each test must fail when its behavior is broken and pass when correct.]
**Examples:** [Give representative inputs, interactions, and expected assertions.]

## Review diff

**Context:** [Describe the feature and link the diff.]
**Goal:** [Find correctness, regression, accessibility, and test gaps.]
**Constraints:** [Report only actionable findings; do not edit files.]
**Acceptance criteria:** [Each finding cites a file/location and explains impact; say when no issues are found.]
**Examples:** [Include relevant expected behavior or edge cases.]

## Commit message

**Context:** [Summarize the staged changes.]
**Goal:** [Write a concise commit subject and, if useful, a short body.]
**Constraints:** [Use imperative mood, avoid claiming unverified work, and do not include unrelated changes.]
**Acceptance criteria:** [Subject describes the change and follows the repository's commit style.]
**Examples:** [Include a preferred style or sample subject.]

## Five-part prompt: add expense

**Context:** The app is a React 18/Vite expense tracker. `App` owns the expense list and category filter; components live one per file under `src/components/`; validation is in `src/utils/expenses.js`.
**Goal:** Add a form that creates an expense with a title, amount, and category.
**Constraints:** Use only the existing categories (Food, Travel, Bills, Other), do not add dependencies, trim titles, keep state in `App`, preserve the current UI patterns, and expose stable `data-cy` selectors.
**Acceptance criteria:**
1. Submitting title `Lunch`, amount `250`, category `Food` adds one visible row with those values.
2. Submitting a blank or whitespace-only title adds no row and shows a title validation message.
3. Submitting a non-numeric, zero, or negative amount adds no row and shows an amount validation message.
4. Submitting an amount greater than `100000` adds no row and shows an amount validation message.
5. A valid submission clears the form and can be verified by a component test.
**Examples:** `(" Lunch ", "250", "Food")` creates a row titled `Lunch` with amount `250.00`; `("Taxi", "-1", "Travel")` leaves the row count unchanged and displays an amount error.
