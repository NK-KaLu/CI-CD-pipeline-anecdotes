/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'

const baseUrl = 'https://anecdotesrender.onrender.com/anecdotes'

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

  
const createNew = async (content) => {
	const object = content
	const response = await axios.post(baseUrl, object)
	return response.data
  
}

const addVote = async (content) => {
	const object = content
	const response = await axios.patch(baseUrl + '/' + object.id , object)
	return response.data
}

export default { getAll, createNew, addVote }