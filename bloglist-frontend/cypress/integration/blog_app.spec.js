describe('Blog app', function () {

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    // create here a user to backend
    const user = {
      name: 'Tester',
      username: 'testing',
      password: '12345678'
    }
    const user2 = {
      name: 'Tester2',
      username: 'testing2',
      password: '12345678'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.request('POST', 'http://localhost:3003/api/users', user2)

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
      cy.createBlogWithUi({ title: 'Test Cypress Blog', author: 'Mr. Cypress', url: 'www.cypress.com' })

      cy.get('.message')
        .should('contain', 'a new blog Test Cypress Blog by Mr. Cypress added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
      cy.get('.blog')
        .should('contain', 'Test Cypress Blog Mr. Cypress')
    })
    describe('several blogs can de created', function () {
      beforeEach(function () {
        const blogs = [{ title: 'first blog', author: 'Mr. A', url: 'www.urlA.com' },
        { title: 'second blog', author: 'Mr. B', url: 'www.urlB.com' },
        { title: 'third blog', author: 'Mr. C', url: 'www.urlC.com' }
        ]

        blogs.forEach(blog => cy.createBlogWithUi(blog))
        cy.wait(3000)
      })

      it('and a blog can be liked', function () {
        cy.get('.blog').contains('second blog')
          .contains('view details')
          .click()
        cy.contains('like')
          .click()
          .click()
          .click()
        cy.get('#likes')
          .should('contain', '3')
      })

      it('and a blog can be removed', function () {
        cy.get('.blog').contains('first blog')
          .contains('view details')
          .click()
        cy.get('button').contains('Remove')
          .click()

        cy.get('.message').contains('blog first blog by Mr. A was deleted')
      })
    })

  })

})