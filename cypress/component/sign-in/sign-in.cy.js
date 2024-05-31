// import SignInPage from '/src/app/(not_authorized)/sign-in'
 
describe('<SignInPage/>', () => {
  // beforeEach('Visit', () => {
  //   // cy.visit('http://localhost:3000/')
  // })
  it('should render and display expected content', () => {
    // Mount the React component for the About page
    // cy.mount(<SignInPage />)
 
    // The new page should contain an h1 with "About page"
    // cy.get('p').contains('Sign In')
 
    // Validate that a link with the expected URL is present
    // *Following* the link is better suited to an E2E test
    cy.get('#sign-in-link-sign-up').should('be.visible')
    cy.get('#sign-in-link-sign-up').contains('Sign Up')
  })
})