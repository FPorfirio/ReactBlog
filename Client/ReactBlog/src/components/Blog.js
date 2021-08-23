import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updatePost, deletePost }) => {
	const [flagState, setFlagState] = useState(false)
	const [likes, setLikes] = useState(blog.likes)
	const [deletePostId, setDeletePostId] = useState('')
	const didMountRef = useRef(false)

	const showDetails = () => {
		setFlagState(!flagState)
	}

	const likeHandler = (event) => {
		setLikes(likes + 1)
	}
	const confirmDelete = () => {
		const deletePopup = window.confirm(`are you sure you want to delete ${blog.title}${blog.author}`)
		if(deletePopup){
			deletePost(deletePostId)
		}
	}

	useEffect(() => {
		if (didMountRef.current){
			updatePost({ ...blog, likes:likes })
		}
	}, [likes])

	useEffect(() => {
		if (didMountRef.current){
			confirmDelete()
		}
		else{
			didMountRef.current = true
		}
	}, [deletePostId])

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}
	if(flagState){
		return (
			<div data-cy='blog' style={blogStyle}>
				<div>
					{blog.title} {blog.user.username}
					<button onClick={showDetails}>hide</button>
				</div>
				<div>
					<p>{blog.url}</p>
					{blog.likes}
					<button onClick={likeHandler}>Like</button>
					<p>{blog.author}</p>
					<button onClick={(event) => {
						setDeletePostId(blog.id)
					}}>
            Delete
					</button>
				</div>
			</div>
		)
	}

	return(
		<div data-cy='blog' style={blogStyle}>
			{blog.title} {blog.user.username}
			<button onClick={showDetails}>show</button>
		</div>
	)
}

Blog.propTypes = {
	blog: PropTypes.object.isRequired,
	updatePost: PropTypes.func.isRequired,
	deletePost: PropTypes.func.isRequired
}

export default Blog
