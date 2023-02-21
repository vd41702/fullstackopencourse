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
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

// get information
app.get('/info', (request, response) => {
    Contact.find({}).then(contacts => {
        response.send(`<p>The phonebook has the information of ${contacts.length} people</p>
        <p>${Date()}</p>`)
        mongoose.connection.close()
    }).catch(err => {
        console.log(err.message)
    })
})

// get all contacts
app.get('/api/contacts', (request, response) => {
    Contact.find({}).then(contacts => {
        response.json(contacts)
    }).catch(err => {
        console.log(err.message)
    })
})

// get contact by id
app.get('/api/contacts/:id', (request, response) => {
    Contact.findById(request.params.id).then(contact => {
        response.json(contact)
    }).catch(err => {
        console.log(err)
    })
})


// /*** Delete Requests ***/
// // delete contact by id
// app.delete('/api/contacts/:id', (request, response) => {
//     const id = Number(request.params.id)
//     contacts = contacts.filter(contact => contact.id !== id)

//     response.status(204).end()
// })


/*** Post Requests ***/
// post new contact
app.post('/api/contacts', (request, response) => {
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

    contact.save().then(res => {
        console.log("contact saved!")
    })
    response.json(contact)
})



// unknown endpoint request
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)