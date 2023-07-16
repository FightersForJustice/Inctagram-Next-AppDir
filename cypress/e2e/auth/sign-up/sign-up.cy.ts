import { randomTextGenerator } from "../../utilits/randomTextGenerator";

describe("sign up page flow", () => {
  beforeEach("login", () => {
    cy.visit("/sign-up");
  });
  it("succeed registration", () => {
    const userData = {
      name: randomTextGenerator(),
      email: `${randomTextGenerator()}@gmail.com`,
      password: randomTextGenerator(),
    };
    cy.get("#sign-up-userName")
      .type(userData.name)
      .get("#sign-up-email")
      .type(userData.email)
      .get("#sign-up-password")
      .type(userData.password)
      .get("#sign-up-passwordConfirm")
      .type(userData.password)
      .get("#sign-up-submit")
      .click();
  });
});
