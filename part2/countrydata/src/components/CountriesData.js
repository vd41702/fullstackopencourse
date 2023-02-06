import WeatherData from "./WeatherData"



const CountriesData = ({ filteredCountries }) => {


    if(filteredCountries.length > 10) {
        return <p>Too many matches, refine your search</p>
    } else if(filteredCountries.length === 0) {
        return <p>no matches, refine your search</p>
    } else if(filteredCountries.length === 1) {
        return <CountryData country={filteredCountries[0]}/>
    }

    return (
        <div>
            <h4>Countries</h4>
            {filteredCountries.map(country => <CountryRow name={country.name.common} key={country.name.common}/>)}
        </div>
    )
}


const CountryRow = ({ name }) => {
    return <p>{name}</p>
}

const CountryData = ({ country }) => {
    const langs = []

    for(const lang in country.languages) {
        langs.push(country.languages[lang])
    }

    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>capital: {country.capital}</p>
            <p>area: {country.area}</p>
            <h4>languages:</h4>
            <ul>{langs.map(lang => <li key={lang}>{lang}</li>)}</ul>

            <h4>flag:</h4>
            <img src={country.flags.svg} alt={country.flags.alt} height="150" width="auto"/>
            <WeatherData country={country}/>
        </div>
    )
}



export default CountriesData