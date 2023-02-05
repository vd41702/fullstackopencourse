import axios from 'axios'
const baseURL = "http://localhost:3001/people"

const getAllContacts = () => {
    axios.get(baseURL)
    .then(response => response.data)
    .catch(error => {
        console.log("get all failed")
    })
}

const createContact = newContact => {
    axios.post(baseURL, newContact)
    .then(response => response.data)
    .catch(error => {
        console.log("create contact failed")
    })
}

const updateContact = (id, newContact) => {
    axios.put(`${baseURL}/${id}`, newContact)
    .then(response => response.data)
    .catch(error => {
        console.log("update contact failed")
    })
}

export default { getAllContacts, createContact, updateContact }

