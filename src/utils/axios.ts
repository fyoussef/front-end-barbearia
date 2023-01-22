import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://ts-api-production.up.railway.app/'
})