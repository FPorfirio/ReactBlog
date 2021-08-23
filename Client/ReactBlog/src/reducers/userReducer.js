import userService from '../services/users'

export const createUser = (user) => {
	return async (dispatch) => {
		const newUser = await userService.create(user)
		dispatch({
			action: 'NEW_USER',
			payload: newUser
		})
	}
}

export const getUser = (id) => {
	return async (dispatch) => {
		const user = userService.getUser(id)
		dispatch({
			action: 'GET_USER',
			payload: user
		})
	}
}

const reducer = (state = { user:{}, users: [] }, action) => {
	switch(action.type){
		case 'GET_USERS':
			return { ...state, users: action.payload }

		case 'GET_USER':
			return { ...state, user: action.payload }
	}
}


export default reducer