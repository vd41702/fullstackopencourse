import { useState } from 'react'

import Phonebook from './components/Phonebook'
import PhonebookInputForm from './components/PhonebookInputForm'
import PhonebookSearch from './components/PhonebookSearch'

const App = () => {
  const [people, setPeople] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNum] = useState('')

  const [searchText, setSearchText] = useState('')


  const handleInputNameChange = (event) => setNewName(event.target.value)
  const handleInputNumberChange = (event) => setNewNum(event.target.value)
  const handleSearchTextChange = (event) => setSearchText(event.target.value)

  const addName = (event) => {
    event.preventDefault()

    if(isValidName(newName, people)) {
      setPeople(people.concat(
        { name: newName, 
          number: newNumber, 
          id: people.length + 1 }))
    }
    
    setNewNum('')
    setNewName('')
  }


  return (
    <div>
      <h2>Phonebook</h2>

      <PhonebookInputForm
       newName = {newName}
       newNum = {newNumber}
       onNameInputChange = {handleInputNameChange}
       onNumInputChange = {handleInputNumberChange}
       onFormSubmit = {addName} />

      <PhonebookSearch
       onSearchTextChange = {handleSearchTextChange}
       searchText = {searchText} />
      
      <Phonebook people={people} searchText={searchText}/>
      
    </div>
  )
}

const isValidName = (name, people) => {

  if(name === "") {
    alert('"" is not a valid name')
    return false
  }

  for(let i = 0; i < people.length; i++) {
    if(people[i].name === name) {
      alert(`${name} already exists in the phonebook`)
      return false
    }
  }

  return true
}



export default App
