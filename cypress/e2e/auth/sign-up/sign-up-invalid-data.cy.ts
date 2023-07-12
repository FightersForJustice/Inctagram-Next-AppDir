describe("sign up page flow with invalid data", () => {
  beforeEach("login", () => {
    cy.visit("/sign-up");
  });
  it("sign up test with bad data", () => {
    const errors = {
      badTexts: {
        nameShort: "tw",
        notEmail: "bla vla",
        shortPass: "test",
      },
      errors: {
        nameShort: "userName must be at least 3 characters",
        notEmail: "email must be a valid email",
        shortPass: "password must be at least 6 characters",
        shortPasswordConfirm: "passwordConfirm must be at least 6 characters",
      },
    };
    cy.get("#sign-up-userName")
      .type(errors.badTexts.nameShort)
      .get("#sign-up-email")
      .type(errors.badTexts.notEmail)
      .get("#sign-up-password")
      .type(errors.badTexts.shortPass)
      .get("#sign-up-passwordConfirm")
      .type(errors.badTexts.shortPass)

      .get("#sign-up-submit")
      .click()

      .get("#sign-up-userName-error")
      .should("contain.text", errors.errors.nameShort)
      .get("#sign-up-email-error")
      .should("contain.text", errors.errors.notEmail)
      .get("#sign-up-password-error")
      .should("contain.text", errors.errors.shortPass)
      .get("#sign-up-passwordConfirm-error")
      .should("contain.text", errors.errors.shortPasswordConfirm);
  });

  describe("go to sign-in", () => {
    beforeEach("registration link", () => {
      cy.visit("/sign-up");
    });

    it("go to link 'forgot password'", () => {
      const baseURL = "http://localhost:3000";
      cy.get("#sign-up-link-to-sign-in").click();
      cy.url().should("eq", `${baseURL}/sign-in`);
    });
  });
});
