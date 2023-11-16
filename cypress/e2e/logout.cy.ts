describe("Login spec", () => {
  it("user logout", () => {
    cy.visit("/login");
    cy.intercept(
      {
        method: "GET",
        url: "/api/session",
      },
      []
    ).as("session");

    cy.get("input[formControlName=email]").type("yoga@studio.com");
    cy.get("input[formControlName=password]").type(
      `${"test!1234"}{enter}{enter}`
    );

    cy.url().should("include", "/sessions");

    cy.contains("Account").click();
    cy.contains("Logout").click();
  });
});
