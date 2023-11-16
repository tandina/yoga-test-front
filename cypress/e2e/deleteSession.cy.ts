describe("Login spec", () => {
  it("delete user session", () => {
    cy.visit("/login");
    cy.intercept(
      {
        method: "GET",
        url: "/api/session",
      },
      []
    ).as("session");

    cy.get("input[formControlName=email]").type("toure@toure.com");
    cy.get("input[formControlName=password]").type(
      `${"tourepass"}{enter}{enter}`
    );

    cy.url().should("include", "/sessions");

    cy.contains("Account").click();
    cy.contains("Detail").click();
  });
});
