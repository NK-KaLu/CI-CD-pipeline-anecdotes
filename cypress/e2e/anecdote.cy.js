describe('anecdote app', function () {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', { retries: 2 }, () => {
    cy.contains('Anecdotes');
    cy.contains('create new');
  });
});