import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'
import { injectStore } from '../services/config'

const store = configureStore({
  reducer: rootReducer,
})
console.log('injecting store')
injectStore(store)
export default store
