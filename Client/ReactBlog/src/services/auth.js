import axios from 'axios'

const loginUrl = '/login'
const logoutUrl = 'api/logout'

const fetchToken = async () => {
  const token = await axios.get('authorization')
  return token
}

export const login = async (credentials) => {
  const response = await axios.post(loginUrl, credentials)
  console.log(response)
  return response.data
}

export const logout = async () => {
  const response = await axios.post(logoutUrl)
  return response.data
}
export default fetchToken
