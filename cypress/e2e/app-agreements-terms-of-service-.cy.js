describe('agreements', () => {
  beforeEach(() => {
    cy.visit('/agreements/terms-of-service');
  });
  it('screenshot desktop agreements/terms-of-service', () => {
    cy.viewport(1080, 1920).compareSnapshot({
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
