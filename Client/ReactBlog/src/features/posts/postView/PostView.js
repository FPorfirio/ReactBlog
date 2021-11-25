import React from 'react'
import { PostList } from './PostList'
import Header from '../../../common/components/Header'

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
