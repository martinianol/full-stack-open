describe('Blog app', function () {

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('login into application')
  })
  it('Login form exists', function () {
    cy.get('form').should('contain', 'login into application')
  })




})