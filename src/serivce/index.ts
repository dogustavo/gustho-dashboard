import axios from 'axios'

export * from './auth'
export * from './products'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
})

export default api
