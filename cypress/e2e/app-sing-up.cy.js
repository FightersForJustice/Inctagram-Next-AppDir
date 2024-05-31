describe('sign-up', () => {
  beforeEach(() => {
    cy.visit('/sign-up');
    cy.viewport('macbook-15')
  });
  it('sign-up-content-tests', () => {
    cy.get('#sign-up-submit').should('be.disabled');

    // The new url should include "/about"
    cy.url().should('include', '/sign-up');
    // The new page should contain an h1 with "About"
    cy.get('input').contains('Sign Up');
  });
  it('screenshot desktop sign-up', () => {
    cy.compareSnapshot({
      name: 'sign-up-desktop-screenshot',
      testThreshold: 0,
    });
  });
  it('screenshot iphone sign-up', () => {
    cy.viewport('iphone-5').compareSnapshot({
      name: 'sign-up-screenshot',
      testThreshold: 0,
    });
  });
});
