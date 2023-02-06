const CountrySearch = (props) => {
    return (
    <div>
        <h4>Search</h4>
        <input 
        onChange={props.onStringChange} 
        value={props.searchString}
        placeholder = "Enter Search text"/>
    </div>
    )
}


export default CountrySearch