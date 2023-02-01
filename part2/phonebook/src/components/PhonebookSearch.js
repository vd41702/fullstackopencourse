const PhonebookSearch = (props) => {
    return (
        <div>
            <h3>Search</h3>
            <input 
            onChange={props.onSearchTextChange} 
            value={props.searchText}
            placeholder = "Enter Search text"/>
        </div>
    )
    
}




export default PhonebookSearch