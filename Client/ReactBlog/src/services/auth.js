import axios from 'axios'
import { config } from './config'
const { baseUrl } = config

export const fetchToken = async () => {
  const response = await axios.get('/authorization')
  return response.data
}

export const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/login`, credentials)
  return response.data
}

export const logout = async () => {
  const response = await axios.post(`${baseUrl}/logout`)
  return response.data
}
