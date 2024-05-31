describe('agreements', () => {
  beforeEach(() => {
    cy.visit('/agreements/terms-of-service');
    cy.viewport('macbook-15');
  });
  it('screenshot desktop agreements/terms-of-service', () => {
    cy.compareSnapshot({
      name: 'sign-up-desktop-screenshot',
      testThreshold: 0,
    });
  });
  it('screenshot iphone agreements/terms-of-service', () => {
    cy.viewport('iphone-5').compareSnapshot({
      name: 'sign-up-screenshot',
      testThreshold: 0,
    });
  });
});
