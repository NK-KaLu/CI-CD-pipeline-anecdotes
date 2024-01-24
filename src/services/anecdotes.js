/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'

const baseUrl = 'https://anecdotesrender.onrender.com/api'

const getAll = async () => {
	const response = await axios.get(`${baseUrl}/anecdotes`)
	return response.data
}

const createNew = async (content) => {
	const response = await axios.post(`${baseUrl}/anecdotes`, { content })
	return response.data
}

const addVote = async (id, content) => {
	const response = await axios.patch(`${baseUrl}/anecdotes/${id}`, content)
	return response.data
}

export default { getAll, createNew, addVote }