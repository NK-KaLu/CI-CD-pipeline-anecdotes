import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import AnecdoteList from './Anecdotes'

const mockStore = configureStore([])

describe('<AnecdoteList />', () => {
	it('renders anecdotes correctly', () => {
		const store = mockStore({
			anecdotes: [
				{ id: 1, content: 'Anecdote 1', votes: 2 },
				{ id: 2, content: 'Anecdote 2', votes: 5 },
			],
			filter: ''
		})

		render(
			<Provider store={store}>
				<AnecdoteList />
			</Provider>
		)

		expect(screen.getByText('Anecdote 1')).toBeVisible()
		expect(screen.getByText('Anecdote 2')).toBeVisible()
	})
})
