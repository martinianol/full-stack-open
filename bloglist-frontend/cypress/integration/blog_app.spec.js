describe('Blog app', function () {

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    // create here a user to backend
    const user = {
      name: 'Tester',
      username: 'testing',
      password: '12345678'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)

    cy.visit('http://localhost:3000')
  })

  describe('Basic settings', function () {
    it('front page can be opened', function () {
      cy.contains('login into application')
    })
    it('Login form exists', function () {
      cy.get('form').should('contain', 'login into application')
    })

  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('testing')
      cy.get('#password').type('12345678')
      cy.get('#button-login').click()
      cy.get('p')
        .should('contain', 'Tester logged in')
      cy.contains('blogs')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('testing')
      cy.get('#password').type('wrong')
      cy.get('#button-login').click()
      cy.get('.message')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })




})