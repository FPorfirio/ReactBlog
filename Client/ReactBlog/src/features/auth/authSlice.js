import {
  createSlice,
  createAsyncThunk,
  isPending,
  isRejected,
} from '@reduxjs/toolkit'
import {
  login as loginService,
  logout as logoutService,
  fetchToken,
} from '../../services/auth'

export const getToken = createAsyncThunk('getToken', async () => {
  const response = await fetchToken()
  return response
})

export const login = createAsyncThunk('login', async (credentials) => {
  const response = await loginService(credentials)
  return response
})

export const logout = createAsyncThunk('logout', async () => {
  const response = await logoutService()
  console.log(response)
  return response
})

const initialState = {
  user: null,
  token: null,
  authenticated: false,
  status: 'idle',
  error: null,
}

const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem('isAuth', true)
        state.status = 'success'
        state.authenticated = true
        state.token = action.payload.accessToken
        state.user = action.payload.userInfo
        state.error = null
      })
      .addCase(logout.fulfilled, (state, action) => {
        localStorage.setItem('isAuth', false)
        state.status = 'success'
        state.authenticated = false
        state.token = null
        state.user = null
      })
      //arreglar api de usuario
      .addCase(getToken.fulfilled, (state, action) => {
        localStorage.setItem('isAuth', true)
        state.authenticated = true
        state.token = action.payload.accessToken
        state.user = action.payload.userInfo
      })
      .addCase(getToken.rejected, (state, action) => {
        localStorage.setItem('isAuth', false)
        state.status = 'idle'
        state.authenticated = false
        state.token = null
        state.user = null
      })
      .addMatcher(isPending(login, logout), (state, action) => {
        state.status = 'loading'
        state.error = null
      })
      .addMatcher(isRejected(login, logout), (state, action) => {
        state.status = 'idle'
        state.error = action.error.message
      })
  },
})

const selectToken = (state) => state.authentication.token

const selectStatus = (state) => state.authentication.status

const selectUser = (state) => state.authentication.user

const selectIsAuthenticated = (state) => state.authentication.authenticated

const selectError = (state) => state.authentication.error

export {
  selectToken,
  selectStatus,
  selectUser,
  selectIsAuthenticated,
  selectError,
}

export default authSlice.reducer
