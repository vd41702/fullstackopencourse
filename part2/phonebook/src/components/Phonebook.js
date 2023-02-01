const Phonebook = ({people, searchText}) => {
    //console.table(people)
    return (
        <div>
            <h2>Numbers</h2>
            {people.map(person => {
            if(person.name.toLowerCase().indexOf(searchText) != -1)
                return <PhonebookEntry person={person} key={person.name}/>
            })}
        </div>
    )
    
}


const PhonebookEntry = ({person}) => {
    return <p>{person.name}{person.number? ":": ""} {person.number}</p>
}


export default Phonebook
