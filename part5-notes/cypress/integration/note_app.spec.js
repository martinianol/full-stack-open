describe('Note app', function () {
  it('front page can be opened', function () {
    cy.visit('http://localhost:3000')
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2021')
  })

  it('front page contains Browser text', function () {
    cy.visit('http://localhost:3000')
    cy.contains('Browser')
  })
})