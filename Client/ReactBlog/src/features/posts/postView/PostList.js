import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAsync } from '../../../common/hooks'
import { fetchBlogs, selectAllBlogs } from '../postsSlice'
import { Cloudinary } from '@cloudinary/url-gen'
import { Skeleton, SkeletonText } from '@chakra-ui/react'
import { PostCard } from './PostCard'
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
    <>
      <ListContent blogs={cacheBlogs} />
      <StatusBox isLoading={isLoading} error={error} />
    </>
  )
}
