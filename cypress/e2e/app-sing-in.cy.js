describe('sign-in', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.viewport('macbook-15')
  });
  it('sign-in-content-tests', () => {
    cy.get('#sign-in-submit').should('be.disabled');

    // The new url should include "/about"
    cy.url().should('include', '/');
    // The new page should contain an h1 with "About"
    cy.get('input').contains('Sign In');
  });
  it('screenshot desktop sign-in', () => {
    cy.compareSnapshot({
      name: 'sign-in-desktop-screenshot',
      testThreshold: 0,
    });
  });
  it('screenshot iphone sign-in', () => {
    cy.viewport('iphone-5').compareSnapshot({
      name: 'sign-in-screenshot',
      testThreshold: 0,
    });
  });
});
