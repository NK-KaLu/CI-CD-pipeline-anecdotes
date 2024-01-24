import filterReducer from './reducers/filterReducer'
import anecdoteReducer, { setAnecdotes } from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import anecdoteService from './services/anecdotes'
import { configureStore } from '@reduxjs/toolkit'


const store = configureStore({
	reducer: { 
		anecdotes: anecdoteReducer,
		filter: filterReducer,
		notifications: notificationReducer
	}
    
})
  

  
anecdoteService.getAll().then(anecdotes =>
	store.dispatch(setAnecdotes(anecdotes))
)
  
console.log(store.getState())

export default store