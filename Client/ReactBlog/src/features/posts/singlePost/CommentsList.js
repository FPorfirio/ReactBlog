import React, { useEffect } from 'react'
import { Spinner, Heading } from '@chakra-ui/react'
import { useAsync } from '../../../common/hooks'
import { fetchComments } from '../postsSlice'
import { useSelector } from 'react-redux'
import { selectBlogComments } from '../postsSlice'

const StatusBox = ({ isLoading, error }) => {
  return (
    <>
      {isLoading && <Spinner />}
      {error && (
        <div>
          <Heading color="currentcolor" size="md" fontFamily="Prompt" as="h3">
            There are no comments yet
          </Heading>
        </div>
      )}
    </>
  )
}

export const CommentsList = ({ blogId }) => {
  const cacheComments = useSelector((state) =>
    selectBlogComments(state, blogId)
  )
  const { isLoading, error, startFetch, isMounted } = useAsync(
    fetchComments(blogId)
  )
  const isFetched = cacheComments.some((comment) => typeof comment == 'object')

  useEffect(() => {
    if (!isFetched) {
      startFetch()
    }
    return () => {
      isMounted.current = false
    }
  }, [])

  return (
    <div className="bg-indigo-100 pb-1 px-6 md:px-12 lg:pl-24 lg:pr-96">
      <Heading py="1" shadow="md" size="lg" mb="4" as="h2">
        Comments
      </Heading>
      <StatusBox isLoading={isLoading} error={error} />
      {isFetched && (
        <ul className="flex flex-wrap flex-col gap-2 pl-2">
          {cacheComments.map((comment) => (
            <li
              className="p-2 text-gray-700 border border-r-4 border-gray-400 rounded-md"
              key={comment._id}
            >
              {comment.content}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
