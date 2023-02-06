import { useState } from "react"
import weatherDataService from "../services/weatherDataService"

const weatherPicURL = "http://openweathermap.org/img/wn/"

const WeatherData = ({country}) => {
    const [prevCountry, setPrevCountry] = useState('')
    const [weatherData, setWeatherData] = useState(null)

    if(prevCountry !== country.name.common) {
        setPrevCountry(country.name.common)
        console.log("getting weather data")
        
        weatherDataService.getCountryWeather(country)
        .then(returnedData => {
            console.log("weather data fetched!")
            setWeatherData(returnedData)
        })
    }

    if(weatherData===null) {
        return null
    }

    return (
    <div>
        <p>temperature: {weatherData.main.temp}</p>
        <img src={`${weatherPicURL}${weatherData.weather[0].icon}@2x.png`} alt={`The current weather status in ${country.capital}`}/>
        <p>{weatherData.weather[0].description}</p>
        <p>wind speed: {weatherData.wind.speed}</p>
    </div>
    )
}


export default WeatherData