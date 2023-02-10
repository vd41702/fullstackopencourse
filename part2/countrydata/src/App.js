import { useEffect, useState } from "react";

import countryDataService from "./services/countryDataService";

import CountriesData from "./components/CountriesData";
import CountrySearch from "./components/CountrySearch";


function App() {
    const [searchString, setSearchString] = useState('')
    const [countries, setCountries] = useState(null)
    const [countrySelected, setCountrySelected] = useState(null)


    const handleSearchStringChange = event => setSearchString(event.target.value)
    const handleCountrySelection = event => {
      setCountrySelected(event.target.getAttribute("data-index"))
    }

    const resetCountrySelection = () => setCountrySelected(null)

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
      searchString={searchString}
      resetCountrySelection={resetCountrySelection}
      countrySelected={countrySelected}/>

      <CountriesData
      filteredCountries={filterCountries(countries, searchString.toLowerCase(), countrySelected)}
      onSelectCountry={handleCountrySelection}/>
    </div>

  );
}


const filterCountries = (countries, searchString, countrySelected) => {
  if(!countries) {
    return []
  }

  if(countrySelected) {
    return [countries[countrySelected]]
  }

  return countries.map((country, index) => {return {...country, index}})
  .filter(country => {
    return country.name.common.toLowerCase().indexOf(searchString) !== -1
  })
  
}











export default App;
