import { combineReducers } from 'redux'
import blogsReducer from '../features/posts/postsSlice'
import usersReducer from '../features/users/userSlice'
import authReducer from '../features/auth/authSlice'
//import commentsReducer from '../features/comments/'

const reducer = combineReducers({
  blogs: blogsReducer,
  users: usersReducer,
  authentication: authReducer,
  //comments: commentsReducer
})

export default reducer
