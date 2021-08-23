import axios from 'axios'

const loginUrl = '/login'
const logoutUrl = 'api/logout'

const login = async credentials => {
	const response = await axios.post(loginUrl, credentials)
	return response.data
}

const logout = async() => {
	const response = await axios.post( logoutUrl )
	return response.data
}

export default { login, logout }