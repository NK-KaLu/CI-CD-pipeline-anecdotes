/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from 'react'
import AnecdoteList from './components/Anecdotes'
import AnecdoteForm from './components/NewAnecdote'
import VisibilityFilter from './components/VisiblityFilter'
import Notification from './components/Notification'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'



const App = () => {

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeAnecdotes()) 
	}, []) 



  
	return (
		<div>
			<Notification/>
			<AnecdoteList/>
			<VisibilityFilter/>
			<AnecdoteForm/>
		</div>
	)
}

export default App


// just a comment