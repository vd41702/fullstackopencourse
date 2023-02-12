import axios from 'axios'
const baseURL = "https://empty-fire-6002.fly.dev/api/contacts"
/*
{
  "people":[
    { 
      "name": "Arto Hellas", 
      "number": "040-123456",
      "id": 1
    },
    { 
      "name": "Ada Lovelace", 
      "number": "39-44-5323523",
      "id": 2
    },
    { 
      "name": "Dan Abramov", 
      "number": "12-43-234345",
      "id": 3
    },
    { 
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122",
      "id": 4
    }
  ]
}
  */


const getAllContacts = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const createContact = newContact => {
    const request = axios.post(baseURL, newContact)
    return request.then(response => response.data)
}

const updateContact = (id, newContact) => {
    const request = axios.put(`${baseURL}/${id}`, newContact)
    return request.then(response => response.data)
}

const deleteContact = id => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(response => response.data)
}

export default { getAllContacts, createContact, updateContact, deleteContact }

