import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect' // for additional matchers
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store' // if you are using redux-mock-store

import AnecdoteList from './AnecdoteList'

// Mocking the useDispatch hook
jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useDispatch: jest.fn(),
	useSelector: jest.fn(),
}))

// Create a mock store
const mockStore = configureStore([])

test('AnecdoteList renders correctly', () => {
	// Set up a mock state for the Redux store
	const initialState = {
		anecdotes: [
			{ id: 1, content: 'Test Anecdote 1', votes: 5 },
			{ id: 2, content: 'Test Anecdote 2', votes: 3 },
		],
		filter: '',
	}

	// Render the component with the mock store
	const store = mockStore(initialState)
	const { getByText } = render(
		<Provider store={store}>
			<AnecdoteList />
		</Provider>
	)

	// Test that the rendered component contains the expected content
	expect(getByText('Test Anecdote 1')).toBeInTheDocument()
	expect(getByText('Test Anecdote 2')).toBeInTheDocument()
})

// Add more tests for interaction, for example, testing the vote button
test('Clicking the vote button triggers the vote function', () => {
	const store = mockStore({
		anecdotes: [{ id: 1, content: 'Test Anecdote', votes: 0 }],
		filter: '',
	})

	const { getByText } = render(
		<Provider store={store}>
			<AnecdoteList />
		</Provider>
	)

	// Trigger the vote function by clicking the button
	fireEvent.click(getByText('vote'))

	// You can assert that the vote function has been called or that the Redux state has been updated
	// For example, you might expect that the votes have increased
	const updatedState = store.getState()
	expect(updatedState.anecdotes[0].votes).toBe(1)
})