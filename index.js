const express = require('express')
const app = express()

//const { json } = require('express/lib/response')
//const morgan = require('morgan')

const cors = require('cors')
require('dotenv').config()

const Person = require('./models/person')



const requestLogger = (req, response, next) => {
  console.log('Method:', req.method)
  console.log('Path:  ', req.path)
  console.log('Body:  ', req.body)
  console.log('---')
  next()
}

const errorHandler = (error, req, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}


const unknownEndpoint = (req, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}




//morgan.token('body', (req) => JSON.stringify(req.body))
//app.use(morgan('tiny'))

app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(express.static('build'))


let people = []


app.get('/', (req, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/people', (req, response) => {
  Person.find({}).then(people => {
    response.json(people)
  })
})

app.post('/api/people'/*,morgan(':method :url :status :response[content] - :response-time ms :body')*/,(req, response) => {

  //console.log("päästäänkö tänne")

  const body = req.body
  //const randId = Math.floor(Math.random() * 1000000)

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'content missing'
    })
  }else if(people.some(e => e.name === body.name)){
    return response.status(400).json({
      error: body.name + ' is already added to phonebook'
    })
  }

  console.log(req.body, 'tämä on body')
  const person =  new Person({
    name: body.name,
    number: body.number
  })
  console.log(person)
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })


})


app.delete('/api/people/:id', (req, response, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(response => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


app.put('/api/people/:id', (req, response, next) => {
  const body = req.body
  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      console.log('mitäh' + updatedPerson)
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.get('/api/people/:id', (req, response, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.get('/info', (req, response) => {
  Person.find({}).then(people => {
    response.send('<div> <h3>phonebook has info for ' + people.length  + ' people </h3> '  + '<h3>' + Date() + '</h3></div>')
  })
})


app.use(unknownEndpoint)
app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

