describe("Expense tracker", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("adds two expenses and filters the list, count, and total", () => {
    cy.get('[data-cy="title"]').type("Lunch");
    cy.get('[data-cy="amount"]').type("250");
    cy.get('[data-cy="category"]').select("Food");
    cy.get('[data-cy="add-expense"]').click();

    cy.get('[data-cy="title"]').type("Cab");
    cy.get('[data-cy="amount"]').type("400");
    cy.get('[data-cy="category"]').select("Travel");
    cy.get('[data-cy="add-expense"]').click();

    cy.get('[data-cy="total"]').should("contain", "650.00");
    cy.get('[data-cy="count"]').should("contain", "2");

    cy.get('[data-cy="filter"]').select("Food");
    cy.get('[data-cy="expense-item"]').should("have.length", 1);
    cy.get('[data-cy="expense-item"]').should("contain", "Lunch");
    cy.get('[data-cy="count"]').should("contain", "1");
    cy.get('[data-cy="total"]').should("contain", "250.00");
  });

  it("does not add an empty title or negative amount", () => {
    cy.get('[data-cy="amount"]').type("10");
    cy.get('[data-cy="add-expense"]').click();
    cy.get('[role="alert"]').should("contain", "Enter an expense title.");
    cy.get('[data-cy="expense-item"]').should("not.exist");

    cy.get('[data-cy="title"]').type("Invalid");
    cy.get('[data-cy="amount"]').clear().type("-5");
    cy.get('[data-cy="add-expense"]').click();
    cy.get('[role="alert"]').should("contain", "Enter an amount greater than 0.");
    cy.get('[data-cy="expense-item"]').should("not.exist");
  });

  it("deletes an expense and updates the total and count", () => {
    cy.get('[data-cy="title"]').type("Snack");
    cy.get('[data-cy="amount"]').type("12.50");
    cy.get('[data-cy="add-expense"]').click();

    cy.get('[data-cy="delete-expense"]').click();

    cy.get('[data-cy="expense-item"]').should("not.exist");
    cy.get('[data-cy="total"]').should("contain", "0.00");
    cy.get('[data-cy="count"]').should("contain", "0");
  });
});
