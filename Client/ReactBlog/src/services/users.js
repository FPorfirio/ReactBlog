import axios from 'axios'
import { config } from './config'
const { baseUrl } = config

const getAll = async () => {
  const response = await axios.get(`${baseUrl}/api/users`)
  return response.data
}

const create = async (newUser) => {
  const response = await axios.post(`${baseUrl}/api/users`, newUser)
  return response.data
}

const getUser = async (id) => {
  const response = await axios.get(`${baseUrl}/api/users/${id}`)
  return response.data
}

export default { getAll, create, getUser }
