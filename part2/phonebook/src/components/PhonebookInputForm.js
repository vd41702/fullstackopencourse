const PhonebookInputForm = (props) => {
    const newName = props.newName
    const newNum = props.newNum

    return (
    <form onSubmit={props.onFormSubmit}>
        <div>
            name: <input 
            onChange={props.onNameInputChange} 
            value={newName}
            placeholder = "John Smith"/>
        </div>
        <div>
            number: <input 
            onChange={props.onNumInputChange} 
            value={newNum}
            placeholder = "888-888-8888"/>
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
    )


}



export default PhonebookInputForm