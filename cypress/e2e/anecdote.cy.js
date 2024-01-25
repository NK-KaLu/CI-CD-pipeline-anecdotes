/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
describe('anecdote app', function () {
	Cypress.on('uncaught:exception', (err, runnable) => {
		return false
	})
  
	beforeEach(() => {
		cy.visit('http://localhost:3000')
	})
  
	

	it('front page can be opened', { retries: 2 }, () => {

		cy.contains('Anecdotes').should('be.visible')
  
		cy.contains('create new').should('be.visible')

		cy.contains('virhe!!!').should('be.visible') //lisätty virhe notifikaatiota varten
	})
})