const Phonebook = ({people, searchText}) => {
    //console.table(people)
    return (
        <div>
            <h2>Numbers</h2>
            {people.map(person => {
            if(person.name.toLowerCase().indexOf(searchText.toLowerCase()) != -1)
                return <PhonebookEntry person={person} key={person.name}/>
            })}
        </div>
    )
    
}


const PhonebookEntry = ({person}) => {
    return (
        <div>
            {person.name}{person.number? ":": ""} {person.number}
        </div>
    )
}


export default Phonebook
