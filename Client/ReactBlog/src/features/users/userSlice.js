import { createSlice, createAsyncThunk, createEntityAdapter, isPending, isRejected } from '@reduxjs/toolkit'
import userService from '../../services/users'

export const fetchUsers = createAsyncThunk(
	'users/fetchUsers',
	async () => {
		const response = await userService.getAll()
		return response
	}
)

export const fetchUser = createAsyncThunk(
	'user/fetchUser',
	async id => {
		const response = await userService.getUser(id)
		console.log(response)
		return response
	}
)

const userAdapter = createEntityAdapter()

const initialState = userAdapter.getInitialState({
	status: 'idle',
	error: null
})

const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(
				fetchUsers.fulfilled,
				(state, action) => {
					state.status = 'succeded'
					userAdapter.setAll(state, action.payload)
				}
			)
			.addCase(
				fetchUser.fulfilled,
				(state, action) => {
					userAdapter.upsertOne(state, action.payload)
				}
			)
			.addMatcher(
				isPending(fetchUsers),
				(state, action) => {
					state.status = 'loading'
				}
			)
			.addMatcher(
				isRejected(fetchUser, fetchUsers),
				(state, action) => {
					state.status = 'failed'
					state.error = action.error.message
				}
			)
	}
})

export const {
	selectAll: selectAllUsers,
	selectById: selectUserById,
	selectIds: selectUserIds
} = userAdapter.getSelectors( state => state.users)

export const selectUserStatus = (state) => state.users.status
export const selectUserError = (state) => state.users.error

export default userSlice.reducer