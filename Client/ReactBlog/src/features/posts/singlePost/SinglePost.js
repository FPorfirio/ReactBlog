import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { selectBlogById, fetchComments, fetchBlogsby } from '../postsSlice'
import { useParams } from 'react-router'
import { useAsync } from '../../../common/hooks'
import Header from '../../../common/components/Header'
import { CommentsList } from './CommentsList'
import { CommentForm } from './CommentForm'
import { ActionBar } from './ActionBar'
import { Skeleton, SkeletonText } from '@chakra-ui/react'
import { FormattedPost } from './FormatedPost'

const BlogSkeleton = () => {
  return (
    <div className="mb-5 py-4 px-6 md:px-12 lg:pl-24 w-3/5">
      <div className="my-4 w-1/5">
        <Skeleton height="2rem" />
        <Skeleton height="0.5rem" mt="2" />
      </div>
      <div className="flex flex-col gap-10">
        <SkeletonText spacing="3" noOfLines="4" />
        <SkeletonText spacing="3" noOfLines="4" />
        <SkeletonText spacing="3" noOfLines="4" />
      </div>
    </div>
  )
}

const StatusBox = ({ isLoading, error }) => {
  if (isLoading) {
    return <BlogSkeleton className="w-2/5 mx-auto mt-1 flex flex-col gap-2" />
  } else if (error) {
    return <div>{error}</div>
  }
  return null
}

export const SinglePost = () => {
  const { blogId } = useParams()
  const {
    isLoading: blogStatus,
    error: blogError,
    startFetch: blogFetch,
  } = useAsync(fetchBlogsby({ type: 'id', id: blogId }))
  const blog = useSelector((state) => selectBlogById(state, blogId))
  const commentForm = useRef()
  const date = new Date(blog?.createdAt).toDateString()

  useEffect(() => {
    if (!blog) {
      blogFetch()
    }
  }, [blog])

  return (
    <div className="min-h-screen">
      <Header />
      {blog ? (
        <>
          <main className="">
            <article className="overflow-hidden text-darkslatergray pb-5">
              <header className="mb-5 py-4 px-6 md:px-12 lg:pl-24 lg:pr-96 shadow-xl bg-main-background text-gainsboro">
                <h2 className="text-3xl md:text-5xl font-heading">
                  {blog.title}
                </h2>
                <span>{date}</span>
              </header>
              <div className="flex flex-col px-6 md:px-12 lg:pl-24 lg:pr-96 gap-3 text-lg md:text-2xl font-bold font-text">
                <FormattedPost post={blog.content} />
              </div>
              <ActionBar
                formRef={commentForm}
                className="mt-6 mb-3 flex justify-end gap-3 px-6 md:px-12 lg:pl-24 lg:pr-96"
                id={blogId}
              />
            </article>
          </main>
          <CommentForm ref={commentForm} blogId={blogId} />
          <CommentsList blogId={blogId} />
        </>
      ) : (
        <StatusBox isLoading={blogStatus} error={blogError} />
      )}
    </div>
  )
}
