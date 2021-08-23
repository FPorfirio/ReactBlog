import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUsers, selectAllUsers, selectUserStatus, selectUserError } from './userSlice'
import { Table } from '@mantine/core'
import { Link } from 'react-router-dom'

const ListContent = ({ users, isLoading, error }) => {
	if(isLoading == 'loading'){
		return (
			<div>Loading..</div>
		)
	} else if(error) {
		return (
			<div>{error}</div>
		)
	}
	const rows = users.map( user =>
		<tr key={user.id}>
			<td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
			<td>{user.posts.length}</td>
			<td>{user.comments.length}</td>
		</tr>
	)
	return (
		<div>
			<Table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Posts</th>
						<th>Comments</th>
						<th></th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</Table>
		</div>
	)
}

const UserList = () => {
	const users = useSelector(selectAllUsers)
	const usersStatus = useSelector(selectUserStatus)
	const userError = useSelector(selectUserError)
	const dispatch = useDispatch()

	console.log(users, usersStatus)
	useEffect(() => {
		if(usersStatus == 'idle'){
			const pepito = dispatch(fetchUsers())
			console.log(pepito)
		}
	}, [usersStatus, dispatch])

	return (
		<ListContent users={users} isLoading={usersStatus} error={userError} />
	)
}

export default UserList