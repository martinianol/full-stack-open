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
      cy.get('html').should('not.contain', 'Tester logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'testing', password: '12345678' })
    })

    it('A blog can be created', function () {
      cy.contains('Create new blog').click()
      cy.get('#title').type('Test Cypress Blog')
      cy.get('#author').type('Mr. Cypress')
      cy.get('#url').type('www.cypress.com')
      cy.get('#button-create-blog').click()
      cy.get('.message')
        .should('contain', 'a new blog Test Cypress Blog by Mr. Cypress added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
      cy.get('.blog')
        .should('contain', 'Test Cypress Blog Mr. Cypress')
    })
    describe('several blogs can de created', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'first blog', author: 'Mr. A', url: 'www.urlA.com' })
        cy.createBlog({ title: 'second blog', author: 'Mr. B', url: 'www.urlB.com' })
        cy.createBlog({ title: 'third blog', author: 'Mr. C', url: 'www.urlC.com' })
      })
      it.only('and a blog can be liked', function () {

        cy.contains('second blog')
          .contains('view details')
          .click()
        cy.contains('like')
          .click()
          .click()
          .click()
        cy.get('#likes')
          .should('contain', '3')
      })
    })



  })




})