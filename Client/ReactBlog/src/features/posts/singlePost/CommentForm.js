import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { useField, useAsync } from '../../../common/hooks'
import StatusBox from '../../../common/components/StatusBox'
import { createMessage } from '../../../common/utils'

import { addComments } from '../postsSlice'
import {
  Button,
  Textarea,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react'

const validateComment = (comment) => {
  let error

  if (comment.length < 2) {
    error = 'Comment must be at least 2 characters long'
  }
  return error
}

export const CommentForm = forwardRef((props, ref) => {
  const comment = useField({ type: 'text', validator: validateComment })
  const { error, isLoading, data, startFetch, setQuery } = useAsync()
  const [formDisplay, setformDisplay] = useState(false)
  const [formStatus, setFormStatus] = useState(null)
  const formRef = useRef()
  const displayForm = formDisplay ? 'block' : 'hidden'

  useEffect(() => {
    if (data) {
      setFormStatus(createMessage({ status: 'success', field: 'comment' }))
      comment.reset()
    }
    if (error) {
      setFormStatus(createMessage({ status: error, field: 'comment' }))
    }
    if (formDisplay) {
      formRef.current.scrollIntoView(false)
    }
  }, [error, data, formDisplay])

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormStatus(null)
    if (!comment.value.length) {
      setFormStatus(createMessage({ status: 'empty', field: 'comment' }))
      return
    }
    setQuery(() =>
      addComments({ content: comment.value, blogId: props.blogId })
    )
    startFetch()
  }

  useImperativeHandle(ref, () => ({
    toggleForm: () => {
      setformDisplay((prevState) => !prevState)
    },
  }))

  return (
    <div
      ref={formRef}
      id="commentForm"
      className={`bg-indigo-100 py-2 md:px-12 lg:pl-24 lg:pr-96 ${displayForm}`}
    >
      <StatusBox status={formStatus} />
      <form
        className="p-4 bg-main-background md:rounded-lg"
        onSubmit={handleSubmit}
      >
        <FormControl isInvalid={comment.error}>
          <FormLabel fontSize="xl" color="gainsboro" ml="1rem">
            New Comment
          </FormLabel>
          <Textarea
            bg="gainsboro"
            color="darkslategray"
            placeholder="Enter a comment"
            onChange={comment.onChange}
            value={comment.value}
            type={comment.type}
          />
          <FormErrorMessage>{comment.error}</FormErrorMessage>
        </FormControl>
        <Button
          isLoading={isLoading}
          loadingText="Submitting"
          spinnerPlacement="end"
          mt="1rem"
          ml="1rem"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  )
})
