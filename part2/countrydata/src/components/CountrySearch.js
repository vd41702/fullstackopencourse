const CountrySearch = (props) => {
    return (
    <div>
        <h4>Search</h4>
        <input 
        onChange={props.onStringChange} 
        value={props.searchString}
        placeholder = "Enter Search text"/>
        <ResetButton reset={props.resetCountrySelection} countrySelected={props.countrySelected}/>
        
    </div>
    )
}

const ResetButton = ({countrySelected, reset}) => {
    if(countrySelected) {
        return <button onClick={reset}>Back</button>
    }
    return null
}


export default CountrySearch