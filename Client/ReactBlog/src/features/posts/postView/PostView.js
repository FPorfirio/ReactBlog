import React from 'react'
import { PostList } from './PostList'
import Header from '../../../common/components/Header'
import { Button, Heading } from '@chakra-ui/react'
import { useHistory } from 'react-router'
//background content-box y linear-gradient(45deg, black, transparent) lightcyan 142039

export const PostView = () => {
  let history = useHistory()

  const goToNewpost = () => {
    history.push('/newPost')
  }

  return (
    <div className="bg-main-background min-h-screen">
      <Header />
      <div className="md:ml-44 md:mr-5 overflow-hidden">
        <header className="pl-6 py-3 flex flex-col items-start md:mt-3 shadow-xl h-44 text-header-color md:pt-5 md:pl-6 md:gap-5 bg-gradient-to-r from-header-gradient1 to-header-gradient2">
          <Heading
            fontFamily="Abril Fatface, cursive"
            as="h2"
            marginRight={{ base: '1.5rem', md: 'unset' }}
            fontSize={{ base: '2xl', md: '4xl' }}
            fontFamily="Prompt"
            color="lightcyan"
          >
            Learning with examples
          </Heading>
          <Button variant="outline" mt="auto" onClick={goToNewpost}>
            New Post
          </Button>
        </header>
        <PostList />
      </div>
    </div>
  )
}
