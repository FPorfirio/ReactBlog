import React from 'react'
import { PostList } from './PostList'
import Header from '../../../common/components/Header'
import { Button, Heading } from '@chakra-ui/react'
import { useHistory } from 'react-router'
//background content-box y linear-gradient(45deg, black, transparent) lightcyan 142039

export const PostView = () => {
  return (
    <div className="bg-main-background min-h-screen">
      <Header />
      <main>
        <PostList />
      </main>
    </div>
  )
}
