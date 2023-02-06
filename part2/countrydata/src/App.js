import { useEffect, useState } from "react";

import countryDataService from "./services/countryDataService";

import CountriesData from "./components/CountriesData";
import CountrySearch from "./components/CountrySearch";


function App() {
    const [searchString, setSearchString] = useState('')
    const [countries, setCountries] = useState(null)


    const handleSearchStringChange = event => setSearchString(event.target.value)

    useEffect(() => {
      console.log("fetching country data")
      countryDataService.getAllCountryData()
      .then(countryData => {
        console.log("fetch successful!")
        setCountries(countryData)
      })
      .catch(error => {
        console.log("fetching data failed")
        console.log(error)
      })

    }, [])
    
  return (
    <div>
      <CountrySearch 
      onStringChange={handleSearchStringChange}
      searchString={searchString}/>

      <CountriesData
      filteredCountries={filterCountries(countries, searchString.toLowerCase())}/>
    </div>

  );
}


const filterCountries = (countries, searchString) => {
  if(!countries) {
    return []
  }

  return countries.filter(country => {
    return country.name.common.toLowerCase().indexOf(searchString) !== -1
  })
}











export default App;
