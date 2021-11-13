import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchUsers,
  selectAllUsers,
  selectUserStatus,
  selectUserError,
} from './userSlice'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Link,
  Skeleton,
} from '@chakra-ui/react'
import Header from '../../common/components/Header'
import { Link as RouterLink } from 'react-router-dom'

const ListSkeleton = () => {
  return (
    <div className="mx-auto my-12 rounded-2xl w-140 overflow-hidden shadow-md border-2">
      <Skeleton h="40" />
    </div>
  )
}

const StatusBox = ({ isLoading, error }) => {
  console.log(isLoading)
  if (isLoading == 'loading') {
    return <ListSkeleton />
  } else if (error) {
    return <div>{error}</div>
  }
  return null
}

const ListContent = ({ users }) => {
  const rows = users.map((user) => (
    <Tr key={user.id} color="gainsboro">
      <Td>
        <Link as={RouterLink} to={`/users/${user.id}`}>
          {user.username}
        </Link>
      </Td>
      <Td isNumeric>{user.posts.length}</Td>
      <Td isNumeric>{user.comments.length}</Td>
    </Tr>
  ))
  console.log(users, 'rows:', rows)
  return (
    <>
      {users.length && (
        <div className="bg-peru md:w-140 mx-6 md:mx-auto my-12 rounded-2xl shadow-md border-2 border-coral overflow-hidden">
          <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th color="white">
                  <Text>Name</Text>
                </Th>
                <Th isNumeric color="white">
                  <Text>Posts</Text>
                </Th>
                <Th isNumeric color="white">
                  <Text>Comments</Text>
                </Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>{rows}</Tbody>
          </Table>
        </div>
      )}
    </>
  )
}

export const UsersList = () => {
  const users = useSelector(selectAllUsers)
  const usersStatus = useSelector(selectUserStatus)
  const userError = useSelector(selectUserError)
  const dispatch = useDispatch()

  useEffect(() => {
    if (usersStatus == 'idle') {
      dispatch(fetchUsers())
    }
  }, [usersStatus, dispatch])

  return (
    <div className="h-screen bg-main-background">
      <Header />
      <StatusBox isLoading={usersStatus} error={userError} />
      <ListContent users={users} />
    </div>
  )
}
