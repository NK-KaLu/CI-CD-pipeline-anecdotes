import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = []

//const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    votes: 0
  }
}


const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },

    increaseVotes(state, action){
      const id = action.payload
      const anecdoteToVote = state.find(n => n.id === id)
      const changedAnecdote = { 
        ...anecdoteToVote, 
        votes: anecdoteToVote.votes +1
      }
      return state.map(state =>
        state.id !== id ? state : changedAnecdote  
      )     
    }


  },
})



export const { appendAnecdote, setAnecdotes, increaseVotes } = anecdoteSlice.actions


export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}



export const createAnecdote = content => {
  return async dispatch => {
    dispatch(appendAnecdote(content))
  }
}



export const voteAnecdote = object => {
  return async dispatch => {
    const newObject = {content: object.content, votes: object.votes+1 , id: object.id }
    const newVote = await anecdoteService.addVote(newObject)
    dispatch(increaseVotes(newVote.id))
  }
}




export default anecdoteSlice.reducer