import axios from 'axios'
const baseURL = "http://localhost:3001/people"

const initContacts = [
    {
      "name": "Arto Hellas",
      "number": "912",
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
    },
    {
      "name": "Rojer Krishnamoorthi Smith",
      "number": "911",
      "id": 5
    }
  ]


const getAllContacts = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
    .catch(error => {
        console.log("get all failed")
    })
}

const createContact = newContact => {
    const request = axios.post(baseURL, newContact)
    return request.then(response => response.data)
    .catch(error => {
        console.log("create contact failed")
    })
}

const updateContact = (id, newContact) => {
    const request = axios.put(`${baseURL}/${id}`, newContact)
    return request.then(response => response.data)
    .catch(error => {
        console.log("update contact failed")
    })
}

const deleteContact = id => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(response => response.data)
    .catch(error => {
        console.log("delete contact failed")
    })
}

export default { getAllContacts, createContact, updateContact, deleteContact }

