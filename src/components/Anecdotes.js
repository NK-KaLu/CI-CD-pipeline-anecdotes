import { useSelector, useDispatch } from 'react-redux'
import {voteAnecdote} from '../reducers/anecdoteReducer'
import {setupNotification} from '../reducers/notificationReducer'




const AnecdoteList = () => {

	const dispatch = useDispatch()



	const anecdotes = useSelector(({ filter, anecdotes }) => {
		if ( filter === '' ) {
			return anecdotes
		}else{let filtered = anecdotes.filter(anecdote => anecdote.content.toUpperCase().match(filter.toUpperCase()))
			filtered.map(filteredAnecdote => console.log(filteredAnecdote.content))
			return filtered}
  
	})



	const vote = async (anecdote) => {
		try {
			await dispatch(voteAnecdote(anecdote))
			await dispatch(setupNotification(`You voted '${anecdote.content}'`, 5))
		} catch (error) {
			// Handle the error here
			console.error('Error in vote function:', error)
		}
	}
  


	const anecdoteSorting = () => {
		console.log(anecdotes)
		const anecdotesCopy = [...anecdotes]
		anecdotesCopy.sort((a,b) => {
			return b.votes - a.votes
		})

		return(
			anecdotesCopy.map(anecdote =>
				<div key={anecdote.id}>
					<div>
						{anecdote.content}
					</div>
					<div>
            has {anecdote.votes}
						<button onClick={() => vote(anecdote)}>vote</button>
					</div>
				</div>
			)
		)

	}

	return(<div><h2>Anecdotes</h2>{anecdoteSorting()}</div>)
}




export default AnecdoteList