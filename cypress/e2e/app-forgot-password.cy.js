describe('forgot-password', () => {
  beforeEach(() => {
    cy.visit('/forgot-password');
    cy.viewport('macbook-15')
  });
  it('screenshot desktop forgot-password', () => {
    cy.compareSnapshot({
      name: 'sign-up-desktop-screenshot',
      testThreshold: 0,
    });
  });
  it('screenshot iphone forgot-password', () => {
    cy.wait(300)
    cy.viewport('iphone-5').compareSnapshot({
      name: 'sign-up-screenshot',
      testThreshold: 0,
    });
  });
});
