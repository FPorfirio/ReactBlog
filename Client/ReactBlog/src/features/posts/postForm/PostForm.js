import React, { useEffect, useState } from 'react'
import { useField, useAsync } from '../../../common/hooks'
import { addBlog } from '../postsSlice'
import {
  Button,
  ButtonGroup,
  Textarea,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Tag,
  TagLabel,
  TagCloseButton,
} from '@chakra-ui/react'
import { PopoverBtn } from './PopoverBtn'
import { InsertCodeBtn } from './InsertCodeBtn'
import StatusBox from '../../../common/components/StatusBox'
import { UploadWidget } from '../../../common/components/UploadWidget'
import { createMessage } from '../../../common/utils'
import { ReactComponent as PhotogaphIcon } from '../../../assets/photographIcon.svg'
import { ReactComponent as ArrowIcon } from '../../../assets/arrowIcon.svg'
import { ReactComponent as TagIcon } from '../../../assets/tag.svg'
import Navbar from '../../../common/components/navbar'
import { SlateEditor } from './SlateEditor'
import {
  validateTitle,
  validateContent,
  validateDescription,
} from './validations'

const ActionBar = ({ actions }) => {
  const { showUploadModal, setTags } = actions

  return (
    <div className="flex flex-col mx-auto w-full bg-gray-300">
      <ButtonGroup
        width="auto"
        variant="outline"
        colorScheme="teal"
        color="black"
      >
        <PopoverBtn
          Icon={TagIcon}
          stateAction={setTags}
          description="Type your tags separated by space"
          buttonTxt="add Tags"
        />
        <Button
          color="black"
          leftIcon={<PhotogaphIcon />}
          onClick={() => {
            showUploadModal()
          }}
        >
          Add portrait
        </Button>
      </ButtonGroup>
    </div>
  )
}

const TagContainer = ({ tags }) => {
  return (
    <>
      {tags.length > 0 && (
        <div className="w-full flex flex-wrap gap-1 shadow-xl p-1.5 border border-main-background rounded-md">
          {tags.map((tag) => {
            return (
              <Tag
                key={tag}
                borderRadius="full"
                variant="solid"
                colorScheme="teal"
              >
                <TagLabel>{tag}</TagLabel>
                <TagCloseButton />
              </Tag>
            )
          })}
        </div>
      )}
    </>
  )
}

export const PostForm = () => {
  const title = useField({ type: ' text', validator: validateTitle })
  const [content, setContent] = useState([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ])
  const description = useField({
    type: ' text',
    validator: validateDescription,
  })
  const [tags, setTags] = useState([])
  const { error, isLoading, data, startFetch, setQuery } = useAsync()
  const [formStatus, setFormStatus] = useState(null)
  const { showUploadModal, imgUploadResult } = UploadWidget()
  const [contentRef, setContentRef] = useState(null)

  useEffect(() => {
    if (data) {
      setFormStatus(createMessage({ status: 'success', field: 'post' }))
    }
    if (error) {
      setFormStatus(createMessage({ status: error, field: 'post' }))
    }
  }, [error, data])

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormStatus('')

    if (!title.value.length) {
      setFormStatus(createMessage({ status: 'empty', field: 'title' }))
      return
    } else if (!imgUploadResult) {
      setFormStatus(createMessage({ status: 'select_error', field: 'image' }))
      return
    } else if (!description.value.length) {
      setFormStatus(createMessage({ status: 'empty', field: 'description' }))
      return
    } else if (!tags.length) {
      setFormStatus(createMessage({ status: 'empty', field: 'tags' }))
      return
    }

    const newBlog = {
      title: title.value,
      content: content,
      imgUrl: {
        url: imgUploadResult.secure_url,
        public_id: imgUploadResult.public_id,
      },
      description: description.value,
      tags: tags,
    }
    setQuery(() => addBlog(newBlog))
    startFetch()
  }

  return (
    <div className="min-h-screen flex flex-col overflow-hidden bg-gainsboro">
      <Navbar />
      <div className="flex-grow flex flex-wrap flex-col p-4 pt-8 mx-10 md:mx-auto min-h-full h-auto bg-gray-300 gap-1.5 border-l border-r border-teal md:w-155">
        <StatusBox status={formStatus} />
        <ActionBar actions={{ showUploadModal, setTags }} />
        <TagContainer tags={tags} />
        <form
          id="blogForm"
          className="w-full flex-grow flex flex-col gap-2 bg-teal rounded-md mt-5 p-2"
          onSubmit={handleSubmit}
        >
          <FormControl isInvalid={title.error}>
            <FormLabel color="gainsboro">Title</FormLabel>
            <Input
              bg="gainsboro"
              color="darkslategray"
              value={title.value}
              onChange={title.onChange}
              type={title.type}
            />
            <FormErrorMessage>{title.error}</FormErrorMessage>
          </FormControl>

          <FormControl
            display="flex"
            flexDir="column"
            height="100%"
            isInvalid={description.error}
          >
            <FormLabel color="gainsboro">Description</FormLabel>
            <Textarea
              flexGrow="1"
              bg="gainsboro"
              color="darkslategray"
              value={description.value}
              onChange={description.onChange}
              type={description.type}
            />
            <FormErrorMessage>{description.error}</FormErrorMessage>
          </FormControl>
          <div className="rounded-lg p-1 bg-gainsboro flex-grow">
            <SlateEditor
              value={content}
              handleInput={(value) => setContent(value)}
            />
          </div>
        </form>
        <Button
          form="blogForm"
          mt="5"
          leftIcon={<ArrowIcon />}
          colorScheme="teal"
          color="black"
          variant="outline"
          isLoading={isLoading}
          loadingText="Submitting"
          spinnerPlacement="end"
          type="submit"
        >
          Submit
        </Button>
      </div>
    </div>
  )
}

/*
<FormControl
            display="flex"
            flexDir="column"
            height="80"
            isInvalid={content.error}
            colorScheme="teal"
          >
            <InsertCodeBtn
              contentRef={contentRef}
              stateAction={content.setValue}
            />
            <FormLabel color="gainsboro">Text</FormLabel>
            <Textarea
              ref={setContentRef}
              flexGrow="1"
              bg="gainsboro"
              color="darkslategray"
              value={content.value}
              onChange={content.onChange}
              type={content.type}
            />
            <FormErrorMessage>{content.error}</FormErrorMessage>
          </FormControl>
*/
