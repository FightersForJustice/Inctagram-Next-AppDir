describe('agreements privacy-policy', () => {
  beforeEach(() => {
    cy.visit('/agreements/privacy-policy');
  });
  it('screenshot desktop privacy-policy', () => {
    cy.viewport(1080, 1920).compareSnapshot({
      name: 'sign-up-desktop-screenshot',
      testThreshold: 0,
    });
  });
  it('screenshot iphone privacy-policy', () => {
    cy.viewport('iphone-5').compareSnapshot({
      name: 'sign-up-screenshot',
      testThreshold: 0,
    });
  });
});
