import axios from 'axios'
const baseURL = "https://restcountries.com/v3.1/all"



const getAllCountryData = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}


export default { getAllCountryData }