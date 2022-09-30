const express = require('express')

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const app = express()
app.use(express.json())

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

  
app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body || !body.name || !body.number) {
        console.log("found error", body)
        return response.status(400).json({ 
        error: 'name or number missing' 
        })
    }
    if (persons.find(p => p.name === body.name)) {
      return response.status(409).json({
        error: 'name must be unique'
      })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * 10000)
    }
    console.log("created new person")

    persons = persons.concat(person)

    response.json(person)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
  
    response.status(204).end()
})

app.get('/info', (request, response) => {
    const curDate = new Date()
    response.end(`phonebook has info for ${persons.length} persons\n${curDate.toString()}`)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})