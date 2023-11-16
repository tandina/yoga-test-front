describe("Login spec", () => {
  it("Login successfull", () => {
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
  });

  it("display user information", () => {
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
  });
});
