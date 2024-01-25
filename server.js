const jsonServer = require('json-server')
const express = require('express')
const cors = require('cors')

const app = express()
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

app.use(cors())
app.use(middlewares)

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'https://anecdotesrender.onrender.com')
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
	next()
})


app.get('/health', (req, res) => {
	//throw 'error...'
	// eslint-disable-next-line no-unreachable
	res.send('ok')
})


app.use('/api', router)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`JSON Server is running on port ${PORT}`)
})
