import axios from 'axios'

const baseWeatherURL = "https://api.openweathermap.org/data/2.5/weather?"
const openWeatherAPIKey = process.env.REACT_APP_OPENWEATHER_API_KEY

const getCountryWeather = (country) => {
    console.log(`${baseWeatherURL}q=${country.capital}&appid=${openWeatherAPIKey}&units=imperial`)
    
    const request = axios.get(`${baseWeatherURL}q=${country.capital}&appid=${openWeatherAPIKey}&units=imperial`)
    return request.then(response => response.data)
}



export default { getCountryWeather }