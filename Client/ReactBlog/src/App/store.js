import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'
import { injectStore } from '../services/blogs'

const store = configureStore({
	reducer: rootReducer
})
injectStore(store)
export default store