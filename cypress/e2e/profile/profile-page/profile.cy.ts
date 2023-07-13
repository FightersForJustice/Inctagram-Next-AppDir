
describe("profile", () => {
    const testEmail = "yxjtnpvgllrazcyssq@bbitj.com"
    const testPass = "12345678"
    const baseURL = "http://localhost:3000"
    beforeEach("profile", () => {
        cy.visit("/sign-in");
        cy.get("#sign-in-email-input").type(testEmail)
        cy.get("#sign-in-password-input").type(testPass)
        cy.get("#sign-in-submit").click().wait(5000);
    });
    it("what profile should have", () => {
        cy.get("#profile-userName").should("contain.text", "Samchik")
        cy.get("#profile-aboutMe").should("contain.text", "amma super-progger")
    });
    it("checked link to settings-profile", () => {
        cy.get("#profile-link-to-settings-profile").click().wait(10000)
        cy.url().should("eq", `http://localhost:3000/settings-profile`)
    })
});
