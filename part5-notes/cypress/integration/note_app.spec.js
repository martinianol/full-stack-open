describe('Note app', function () {

  beforeEach(function () {
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2021')
  })

  it('front page contains Browser text', function () {
    cy.contains('Browser')
  })

  it('login form can be opened', function () {
    cy.contains('login').click()
    cy.get('#username').type('root')
    cy.get('#password').type('sekret')
    cy.get('#login-button').click()

    cy.contains('logged-in')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.contains('login').click()
      cy.get('#username').type('root')
      cy.get('#password').type('sekret')
      cy.get('#login-button').click()
    })

    it('a new note can be created', function () {
      cy.contains('new note').click()
      cy.get('#newNote').type('a note created by cypress')
      cy.get('#save-new-note').click()
      cy.contains('a note created by cypress')
    })
  })
})

