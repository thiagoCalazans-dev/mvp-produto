import axios from 'axios'

const ajax = axios.create({
    baseURL: 'https://testealmox.azurewebsites.net/api'
})

export default ajax;
