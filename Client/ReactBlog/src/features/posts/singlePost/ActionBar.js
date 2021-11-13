import React from 'react'
import { ReactComponent as CommentIcon } from '../../../assets/commentIcon.svg'
import { ReactComponent as TrashIcon } from '../../../assets/trashIcon.svg'
import { ReactComponent as ThumbIcon } from '../../../assets/thumbIcon.svg'
import { IconButton } from '@chakra-ui/react'
import { useAsync } from '../../../common/hooks'
import { deleteBlog, updateBlog } from '../postsSlice'
import { useHistory, useLocation } from 'react-router'

export const ActionBar = ({ className, id, formRef }) => {
  const { startFetch, setQuery } = useAsync()
  const history = useHistory()
  const location = useLocation()

  const toggleHash = () => {
    if (!location.hash) {
      history.push('#commentForm')
    } else {
      history.push(location.pathname)
    }
  }

  const handleAction = (e) => {
    const target = e.target.closest('button')
    switch (target?.name) {
      case 'delete':
        setQuery(() => deleteBlog(id))
        startFetch()
        break
      case 'like':
        setQuery(() => updateBlog({ id: id, fields: { likes: 1 } }))
        startFetch()
        break
      case 'comment':
        formRef.current.toggleForm()
        toggleHash()
    }
  }

  return (
    <div onClick={handleAction} className={className}>
      <IconButton
        bg="#034b67"
        isRound
        colorScheme="blue"
        name="like"
        icon={<ThumbIcon />}
      />
      <IconButton
        bg="#034b67"
        isRound
        colorScheme="blue"
        name="delete"
        icon={<TrashIcon />}
      />
      <IconButton
        bg="#034b67"
        colorScheme="blue"
        isRound
        name="comment"
        icon={<CommentIcon />}
      />
    </div>
  )
}
