import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { useAsync } from '../../common/hooks'
import { selectUserById, fetchUser } from './userSlice'
import { UserCard, CardSkeleton } from './userCard/UserCard'

const StatusBox = ({ isLoading, error }) => {
  if (isLoading) {
    return (
      <CardSkeleton className="p-4 md:w-2/5 md:mx-auto md:mt-20 flex flex-col gap-2" />
    )
  }
  if (error) {
    return <div>{error}</div>
  }
  return null
}

export const SingleUser = () => {
  const { userId } = useParams()
  const {
    isLoading: userLoading,
    error: userError,
    startFetch: startUserFetch,
  } = useAsync(fetchUser(userId))
  const userCache = useSelector((state) => selectUserById(state, userId))

  useEffect(() => {
    if (!userCache) {
      startUserFetch()
    }
  }, [])

  return (
    <div className="min-h-screen bg-main-texture bg-header-gradient1 overflow-hidden">
      <StatusBox isLoading={userLoading} error={userError} />
      {userCache && <UserCard user={userCache} />}
    </div>
  )
}
