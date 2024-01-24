const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const cors = require('cors');

server.use(cors());
server.use(middlewares);

// Enable CORS for all routes
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://anecdotesrender.onrender.com');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


app.get('/health', (req, res) => {
    //throw 'error...'
    // eslint-disable-next-line no-unreachable
    res.send('ok')
  })
  


// This line handles all routes starting with /api using the json-server router
server.use('/api', router);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});