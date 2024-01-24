describe('anecdote app', function() {
  it('front page can be opened', { retries: 2 }, () => {
    cy.visit('http://localhost:3000')
    cy.contains('Anecdotes')
    cy.contains('create new')
  })
})