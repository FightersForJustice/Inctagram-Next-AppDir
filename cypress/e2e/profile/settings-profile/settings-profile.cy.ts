describe("settings-profile", () => {
    const userData = {
        baseURL:"http://localhost:3000",
        testEmail: "yxjtnpvgllrazcyssq@bbitj.com",
        testPass: "12345678",
        userName: "Samchik",
        firstName: "Samuil",
        lastName: "Prytchyn",
        city: "Gdańsk",
        aboutMe: "amma super-progger ",
    }

    beforeEach("settings-profile", () => {
        cy.visit("/sign-in");
        cy.get("#sign-in-email-input").type(userData.testEmail)
        cy.get("#sign-in-password-input").type(userData.testPass)
        cy.get("#sign-in-submit").click().wait(5000);
        cy.visit("/settings-profile");
    });


    it("checked link to settings-profile", () => {
        cy.get('input[name="userName"]').invoke('val').should("contain.text", userData.userName)
        cy.get("settings-profile-firstName").should("contain.value", userData.firstName)
        cy.get("settings-profile-lastName").should("contain.value", userData.lastName)
        cy.get("settings-profile-city").should("contain.value", userData.city)
        cy.get("settings-profile-aboutMe").should("contain.value", userData.aboutMe)
    })
});
