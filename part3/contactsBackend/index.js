const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const Contact = require('./models/Contact')

const app = express()

app.use(cors())

app.use(express.json())

// logging requests
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




/*** Get Requests ***/

// get home page
app.get('/', (request, response, next) => {
    response.send('<h1>Hello World!</h1>')
})

// get information
app.get('/info', (request, response, next) => {
    Contact.find({})
    .then(contacts => {
        response.send(`<p>The phonebook has the information of ${contacts.length} people</p>
        <p>${Date()}</p>`)
        mongoose.connection.close()
    })
    .catch(error => next(error))
})

// get all contacts
app.get('/api/contacts', (request, response, next) => {
    Contact.find({})
    .then(contacts => {
        response.json(contacts)
    })
    .catch(error => next(error))
})

// get contact by id
app.get('/api/contacts/:id', (request, response, next) => {
    Contact.findById(request.params.id)
    .then(contact => {
        if(contact) {
            response.json(contact)
        } else {
            response.status(404).end()
        }
    })
    .catch(error => next(error))
})


/*** Delete Requests ***/
// delete contact by id
app.delete('/api/contacts/:id', (request, response, next) => {
    Contact.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


/*** Post Requests ***/
// post new contact
app.post('/api/contacts', (request, response, next) => {
    const body = request.body

    if(!body.name) {
        return response.status(400).json({error: 'missing name'})
    }

    if(!body.number) {
        return response.status(400).json({error: 'missing number'})
    }

    /**
     * TODO: check for duplicate name
     * if duplicate, need to update
     * otherwise, create new contact
     */

    // if(contacts.some(contact => contact.name === body.name)) {
    //     return response.status(400).json({error: 'name must be unique'})
    // }

    const contact = new Contact({
        name: body.name,
        number: body.number
    })

    contact.save()
    .then(res => {
        console.log("contact saved!")
    })
    .catch(error => next(error))

    response.json(contact)
})

/** Put Requests */
app.put('/api/contacts/:id', (request, response, next) => {
    const body = request.body
  
    if(!body.name) {
        return response.status(400).json({error: 'missing name'})
    }

    if(!body.number) {
        return response.status(400).json({error: 'missing number'})
    }

    const contact = {
        name: body.name,
        number: body.number
    }
  
    Contact.findByIdAndUpdate(request.params.id, contact, { new: true })
      .then(updatedContact => {
        response.json(updatedContact)
      })
      .catch(error => next(error))
  })



// unknown endpoint request
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

// error handler
const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
  }
  
  app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)