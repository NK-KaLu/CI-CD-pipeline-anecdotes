const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

// Enable CORS for all routes
server.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'https://anecdotesrender.onrender.com') // Change '*' to the actual origin of your React app
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
	next()
})

server.use('/api', router)

const PORT = process.env.PORT || 3001
server.listen(PORT, () => {
	console.log(`JSON Server is running on port ${PORT}`)
})
