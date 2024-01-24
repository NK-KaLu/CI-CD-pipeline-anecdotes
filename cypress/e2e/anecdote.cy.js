describe('anecdote app', function () {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', { retries: 2 }, () => {
    cy.contains('Anecdotes').then(() => {
      cy.log('Found "Anecdotes" element successfully');
    });
  
    cy.contains('create new').then(() => {
      cy.log('Found "create new" element successfully');
    });
  });
});