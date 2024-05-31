describe('forgot-password', () => {
  beforeEach(() => {
    cy.visit('/forgot-password');
    cy.wait(1000)
  });
  it('screenshot desktop forgot-password', () => {
    cy.viewport(1080, 1920).compareSnapshot({
      name: 'sign-up-desktop-screenshot',
      testThreshold: 0,
    });
  });
  it('screenshot iphone forgot-password', () => {
    cy.viewport('iphone-5').compareSnapshot({
      name: 'sign-up-screenshot',
      testThreshold: 0,
    });
  });
});
