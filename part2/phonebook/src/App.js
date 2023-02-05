import { useState } from 'react'
import { useEffect } from 'react'

import contactsService from './services/contactsService'

import Phonebook from './components/Phonebook'
import PhonebookInputForm from './components/PhonebookInputForm'
import PhonebookSearch from './components/PhonebookSearch'
import AlertNotif from './components/AlertNotif'

const App = () => {
  const [people, setPeople] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNum] = useState('')

  const [searchText, setSearchText] = useState('')


  useEffect(() => {
    console.log("fetching data")
    contactsService.getAllContacts()
      .then(responseData => 
        setPeople(responseData))
    console.log("data fetched")
}, [])

  


  const handleInputNameChange = (event) => setNewName(event.target.value)
  const handleInputNumberChange = (event) => setNewNum(event.target.value)
  const handleSearchTextChange = (event) => setSearchText(event.target.value)
  

  const addName = (event) => {
    event.preventDefault()

    if(isValidName(newName, people)) {
      const newContact = { 
        name: newName, 
        number: newNumber
      }

      let index = people.findIndex((contact => contact.name === newName)) 
      if(index >= 0) {
        if(window.confirm(`${newName} already exists in the phonebook. Would you like to update their contact?`)) {
          let id = people[index].id
          contactsService.updateContact(id, newContact)
          .then(returnedContact => setPeople(people.map(contact => contact.id !== id? contact: returnedContact)))
        }
      } else {
        contactsService.createContact(newContact)
        .then(returnedContact => setPeople(people.concat(returnedContact)))
      }
    }
    
    setNewNum('')
    setNewName('')
  }

  const deleteContact = () => {
    console.log("delete contact")
    const filteredContacts = people.filter(person => person.name.toLowerCase().indexOf(searchText.toLowerCase()) != -1)
    console.table(filteredContacts)
    if(filteredContacts.length > 1) {
      alert("Can't delete more than 1 contact! ")
      return
    }

    if(window.confirm(`Would you like to delete ${filteredContacts[0].name}?`)) {
      contactsService.deleteContact(filteredContacts[0].id)
      .then(returnedContact => {
        setPeople(people.filter(person => person.id != filteredContacts[0].id))
        alert(`${filteredContacts[0].name} has been successfully deleted`)
      })
    }

  }


  return (
    
    <div>
      <h2>Phonebook</h2>
      <AlertNotif message={"testing"} isNotif={false}/>
      <PhonebookInputForm
       newName = {newName}
       newNum = {newNumber}
       onNameInputChange = {handleInputNameChange}
       onNumInputChange = {handleInputNumberChange}
       onFormSubmit = {addName} />

      <PhonebookSearch
       onSearchTextChange = {handleSearchTextChange}
       searchText = {searchText} />

      <button onClick={deleteContact}>Delete contact</button>

      
      <Phonebook 
      people = {people} 
      searchText = {searchText}/>
      
    </div>
  )
}


const isValidName = (name, people) => {

  if(name === "") {
    alert('"" is not a valid name')
    return false
  }

  // for(let i = 0; i < people.length; i++) {
  //   if(people[i].name === name) {
  //     alert(`${name} already exists in the phonebook`)
  //     return false
  //   }
  // }

  return true
}



export default App
