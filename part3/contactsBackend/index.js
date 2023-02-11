const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(express.json())
app.use(morgan((tokens, req, res) => {
    let data = ""
    if(req.method === "POST") {
        data = JSON.stringify(req.body)
    }

    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'),
        '-',
        tokens['response-time'](req, res), 'ms',
        data
    ].join(' ')
}))

let contacts = [
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





/*** Get Requests ***/

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
    response.send(`<p>The phonebook has the information of ${contacts.length} people</p>
    <p>${Date()}</p>`)
})

app.get('/api/contacts', (request, response) => {
    response.json(contacts)
})

app.get('/api/contacts/:id', (request, response) => {
    const id = Number(request.params.id)
    const contact = contacts.find(contact => contact.id === id)

    if (contact) {
        response.json(contact)
        } else {
        response.status(404).end()
        }
})

/*** Delete Requests ***/

app.delete('/api/contacts/:id', (request, response) => {
    const id = Number(request.params.id)
    contacts = contacts.filter(contact => contact.id !== id)

    response.status(204).end()
})

/*** Post Requests ***/
app.post('/api/contacts', (request, response) => {
    const body = request.body

    if(!body.name) {
        return response.status(400).json({error: 'missing name'})
    }

    if(!body.number) {
        return response.status(400).json({error: 'missing number'})
    }

    if(contacts.some(contact => contact.name === body.name)) {
        return response.status(400).json({error: 'name must be unique'})
    }

    const contact = {
        id: 1+Math.floor(Math.random()*1000000),
        name: body.name,
        number: body.number
    }

    contacts = contacts.concat(contact)
    response.json(contact)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)