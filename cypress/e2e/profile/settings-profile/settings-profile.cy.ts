import {randomTextGenerator} from "../../utilits/randomTextGenerator";

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
    it("test values of inputs", () => {
        cy.get("#settings-profile-userName").should("have.value", userData.userName)
        cy.get("#settings-profile-firstName").should("have.value", userData.firstName)
        cy.get("#settings-profile-lastName").should("have.value", userData.lastName)
        cy.get("#settings-profile-city").should("have.value", userData.city)
        cy.get("#settings-profile-aboutMe").should("have.value", userData.aboutMe)
    })
    it("test post request with new profile info", ()=>{
        const randomText = randomTextGenerator()
        cy.get("#settings-profile-userName").clear().type(randomText)
        cy.get("#settings-profile-firstName").clear().type(randomText)
        cy.get("#settings-profile-lastName").clear().type(randomText)
        cy.get("#settings-profile-city").clear().type(randomText)
        cy.get("#settings-profile-aboutMe").clear().type(randomText)
        cy.get('.PrimaryBtn_primaryBtn__9Bjnc').click().wait(5000);
        cy.get("#settings-profile-userName").should("have.value", randomText)
        cy.get("#settings-profile-firstName").should("have.value", randomText)
        cy.get("#settings-profile-lastName").should("have.value", randomText)
        cy.get("#settings-profile-city").should("have.value", randomText)
        cy.get("#settings-profile-aboutMe").should("have.value", randomText)
        cy.get("#settings-profile-userName").clear().type(userData.userName)
        cy.get("#settings-profile-firstName").clear().type(userData.firstName)
        cy.get("#settings-profile-lastName").clear().type(userData.lastName)
        cy.get("#settings-profile-city").clear().type(userData.city)
        cy.get("#settings-profile-aboutMe").clear().type(userData.aboutMe)
        cy.get('.PrimaryBtn_primaryBtn__9Bjnc').click()
    })
});
