import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App.jsx";

async function addExpense(user, { title, amount, category }) {
  await user.type(screen.getByLabelText("Title"), title);
  await user.type(screen.getByLabelText("Amount"), amount);
  await user.selectOptions(screen.getByLabelText("Category"), category);
  await user.click(screen.getByRole("button", { name: "Add expense" }));
}

describe("expense tracker", () => {
  it("adds a valid expense and clears the form", async () => {
    const user = userEvent.setup();
    render(<App />);

    await addExpense(user, { title: "Lunch", amount: "250", category: "Food" });

    const row = screen.getByRole("listitem");
    expect(within(row).getByText("Lunch")).toBeInTheDocument();
    expect(within(row).getByText("250.00")).toBeInTheDocument();
    expect(screen.getByLabelText("Title")).toHaveValue("");
    expect(screen.getByLabelText("Amount")).toHaveValue(null);
  });

  it("rejects an empty title", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText("Amount"), "10");
    await user.click(screen.getByRole("button", { name: "Add expense" }));

    expect(screen.getByRole("alert")).toHaveTextContent("Enter an expense title.");
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });

  it.each(["0", "-25"])("rejects invalid amount %s", async (amount) => {
    const user = userEvent.setup();
    render(<App />);

    await addExpense(user, { title: "Invalid", amount, category: "Travel" });

    expect(screen.getByRole("alert")).toHaveTextContent("Enter an amount greater than 0.");
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });

  it("filters expenses and updates the displayed count and total", async () => {
    const user = userEvent.setup();
    render(<App />);
    await addExpense(user, { title: "Lunch", amount: "250", category: "Food" });
    await addExpense(user, { title: "Cab", amount: "400", category: "Travel" });

    await user.selectOptions(screen.getByLabelText("Filter by category"), "Food");

    expect(screen.getAllByRole("listitem")).toHaveLength(1);
    expect(screen.getByText("Lunch")).toBeInTheDocument();
    expect(screen.queryByText("Cab")).not.toBeInTheDocument();
    expect(screen.getByTestId("total")).toHaveTextContent("250.00");
    expect(screen.getByTestId("count")).toHaveTextContent("1");
  });

  it("deletes an expense and updates the count and total", async () => {
    const user = userEvent.setup();
    render(<App />);
    await addExpense(user, { title: "Lunch", amount: "250", category: "Food" });
    await addExpense(user, { title: "Cab", amount: "400", category: "Travel" });

    await user.click(screen.getByRole("button", { name: "Delete Lunch" }));

    expect(screen.queryByText("Lunch")).not.toBeInTheDocument();
    expect(screen.getByText("Cab")).toBeInTheDocument();
    expect(screen.getByTestId("total")).toHaveTextContent("400.00");
    expect(screen.getByTestId("count")).toHaveTextContent("1");
  });

  it("shows a zero total and count when the list is empty", () => {
    render(<App />);

    expect(screen.getByTestId("total")).toHaveTextContent("0.00");
    expect(screen.getByTestId("count")).toHaveTextContent("0");
  });

  it("rejects an amount above 100000", async () => {
    const user = userEvent.setup();
    render(<App />);

    await addExpense(user, {
      title: "Oversized",
      amount: "100000.01",
      category: "Bills",
    });

    expect(screen.getByRole("alert")).toHaveTextContent("100,000 or less");
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });
});
