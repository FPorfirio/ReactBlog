import { combineReducers } from 'redux'
import blogsReducer from '../features/blogs/blogsSlice'
import usersReducer from '../features/users/userSlice'
import authReducer from '../features/login/authSlice'
//import commentsReducer from '../features/comments/'


const reducer = combineReducers({
	blogs: blogsReducer,
	users: usersReducer,
	authentication: authReducer
	//comments: commentsReducer
})

export default reducer