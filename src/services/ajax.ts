import axios from 'axios'

const ajax = axios.create({
    baseURL: 'https://almoxarifado.azurewebsites.net/api/'
})

export default ajax;
