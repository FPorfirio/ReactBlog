import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAsync } from '../../../common/hooks'
import { fetchBlogs, selectAllBlogs } from '../postsSlice'
import { Cloudinary } from '@cloudinary/url-gen'
import { Skeleton, SkeletonText, Button, Heading } from '@chakra-ui/react'
import { PostCard } from './PostCard'
import { useHistory } from 'react-router'
import { nanoid } from '@reduxjs/toolkit'

const cld = new Cloudinary({
  cloud: {
    cloudName: 'dxpdibonp',
  },
})

const ListSkeleton = () => {
  return (
    <div className="flex h-60 bg-red gap-5 p-4">
      <div className="flex-grow w-2/4 mb-4">
        <Skeleton mb="4" h="2" />
        <SkeletonText spacing="3" noOfLines="6" />
      </div>
      <Skeleton w="50%" className="flex-grow w-2/4" h="60" />
    </div>
  )
}

const StatusBox = ({ isLoading, error }) => {
  if (isLoading) {
    return <ListSkeleton />
  }
  if (error) {
    return <div>{error}</div>
  }
  return null
}

const ListHeader = () => {
  let history = useHistory()

  const goToNewpost = () => {
    history.push('/newPost')
  }

  return (
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
  )
}

const ListContent = ({ blogs }) => {
  return (
    <>
      {blogs.length != 0 && (
        <div className=" bg-main-panel mx-auto p-4">
          <ul className="flex flex-wrap gap-3 justify-center">
            {blogs.map((blog, index) => {
              const blogImg = cld.image(blog.imgUrl.public_id)
              blogImg.format('auto').quality('auto')

              return (
                <li key={`item-${index}`} className="w-full" key={blog.id}>
                  <PostCard blog={blog} blogImg={blogImg} />
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </>
  )
}

export const PostList = () => {
  const cacheBlogs = useSelector(selectAllBlogs)
  const { error, isLoading, startFetch, isMounted } = useAsync(fetchBlogs())

  useEffect(() => {
    if (!cacheBlogs.length) {
      startFetch()
    }
    return () => {
      isMounted.current = false
    }
  }, [])

  return (
    <article className="md:ml-44 md:mr-5 overflow-hidden">
      <ListHeader />
      <ListContent blogs={cacheBlogs} />
      <StatusBox isLoading={isLoading} error={error} />
    </article>
  )
}
