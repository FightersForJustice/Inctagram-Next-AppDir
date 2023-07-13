describe("sign-in page flow", () => {
  beforeEach("login", () => {
    cy.visit("/sign-in");
  });
  it("login test with bad data", () => {
    const badText = "example bad text";
    const badPass = "pass";
    const emailError = "email must be a valid email";
    const errorPass = "password must be at least 6 characters";

    cy.get("#sign-in-email-input").type(badText);
    cy.get("#sign-in-password-input").type(badPass);
    cy.get("#sign-in-submit").click();
    cy.get("#sign-in-errors-email-message").should("contain.text", emailError);
    cy.get("#sign-in-errors-password-message").should("contain.text", errorPass);
  });
  it("login test with uncreated account: auth error", () => {
    const badEmail = "example@mail.err";
    const badPass = "ThatPassOk";
    const errorPass = "Authorization error";

    cy.get("#sign-in-email-input").type(badEmail);
    cy.get("#sign-in-password-input").type(badPass);
    cy.get("#sign-in-submit").click().wait(3000);
    cy.get("#sign-in-errors-password-message").should("contain.text", errorPass);
  });
});

describe("go to links", () => {
  beforeEach("login links", () => {
    cy.visit("/sign-in");
  });
  it("go to link 'forgot password'", () => {
    const baseURL = "http://localhost:3000";
    cy.get("#sign-in-link-forgot-password").click();
    cy.url().should("eq", `${baseURL}/forgot-password`);
  });
  it("go to link 'Sign Up'", () => {
    const baseURL = "http://localhost:3000";
    cy.get("#sign-in-link-sign-up").click();
    cy.url().should("eq", `${baseURL}/sign-up`);
  });
});