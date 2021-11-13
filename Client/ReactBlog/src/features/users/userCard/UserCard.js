import React from 'react'
import { Avatar, Skeleton, SkeletonText, Heading } from '@chakra-ui/react'
import { ActivityDrawer } from './ActivityDrawer'
import { CardTabs } from './CardTabs'
import ProfileLogo from '../../../assets/man.svg'
import { useDisclosure } from '@chakra-ui/hooks'
import { useSelector } from 'react-redux'
import { selectBlogsByUser, fetchBlogsby } from '../../posts/postsSlice'
import { useAsync } from '../../../common/hooks'

export const CardSkeleton = ({ className }) => {
  return (
    <div className={className}>
      <Skeleton height="13rem" />
      <Skeleton height="2.5rem" />
      <div className="flex flex-col gap-6 px-2">
        <div>
          <Skeleton marginLeft="1rem" height="1.5rem" width="4rem" />
          <SkeletonText
            marginLeft="2rem"
            mt="2"
            noOfLines={7}
            spacing="4"
            width="13rem"
          />
        </div>
        <div>
          <Skeleton marginLeft="1rem" height="1.5rem" width="4rem" />
          <SkeletonText
            marginLeft="2rem"
            mt="2"
            noOfLines={4}
            spacing="4"
            width="13rem"
          />
        </div>
      </div>
    </div>
  )
}

export const UserCard = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isLoading: blogsLoading,
    error: blogsError,
    startFetch: startBlogFetch,
  } = useAsync(fetchBlogsby({ type: 'user', id: user.id }))
  const blogs = useSelector((state) => selectBlogsByUser(state, user.id))

  const handleActivityBtn = () => {
    if (!blogs.length) {
      startBlogFetch()
    }
    onOpen()
  }

  const personalInfo = {
    joined: 25 / 8 / 2021,
    email: 'random@hotmail.com',
    adress: 'Buenos Aires',
    name: 'testName',
    id: 'testId1234',
  }

  const accountInfo = {
    role: 'Admin',
    username: 'monte',
    id: '5555',
  }

  return (
    <div className="p-4 md:w-2/5 md:p-0 md:mx-auto md:mt-20">
      <ActivityDrawer
        content={{ blogs, blogsLoading, blogsError }}
        isOpen={isOpen}
        onClose={onClose}
      />

      <div className="flex items-center justify-center flex-col h-52 bg-blue-200">
        <div className="mt-6">
          <Avatar size="2xl" src={ProfileLogo} />
        </div>
        <Heading>{user.username}</Heading>
      </div>

      <div className="bg-azure">
        <CardTabs
          accountInfo={accountInfo}
          personalInfo={personalInfo}
          activityHandler={handleActivityBtn}
        />
      </div>
    </div>
  )
}
