/* eslint-disable no-undef */
describe('anecdote app', function () {
	beforeEach(() => {
		cy.visit('http://localhost:3000')
	})

	it('front page can be opened', { retries: 2 }, () => {
		// Wait for the "Anecdotes" element to be visible
		cy.contains('Anecdotes').should('be.visible')
  
		// Wait for the "create new" element to be visible
		cy.contains('create new').should('be.visible')
	})
})