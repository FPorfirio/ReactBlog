import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { updateBlog, deleteBlog, selectBlogById, fetchComments, addComments } from './blogsSlice'
import { useParams } from 'react-router'
import { useField, useAsync } from '../../common/hooks'

const BlogBody = ({ blog }) => {
	const { error, isLoading, startFetch, setQuery } = useAsync()

	const handleAction = (e) => {
		const target = e.target.innerText
		switch(target) {
			case 'delete':
				setQuery(() => deleteBlog(blog.id))
				startFetch()
				break
			case 'like':
				setQuery(() => updateBlog({ id: blog.id, fields: { likes: 1 } }))
				startFetch()
		}
	}

	return (
		<div>
			<p>{blog.url}</p>
			{blog.likes}
			<div>
				{isLoading ? 'loading..' : error}
			</div>
			<div>
				<button onClick={handleAction}>delete</button>
				<button onClick={handleAction}>like</button>
			</div>
		</div>
	)
}

const BlogComments = ({ comments, isLoading, error }) => {
	console.log(comments, isLoading)
	if(isLoading){
		return (
			<div>
				loading comments..
			</div>
		)
	} else if(error) {
		return (
			<div>
				{error}
			</div>
		)
	} else if(comments) {
		return (
			<div>
				<ul>
					{
						comments.map( comment => <li key={comment._id}>{comment.content}</li>)
					}
				</ul>
			</div>
		)
	} else {
		return null
	}
}

const CommentForm = ({ blogId }) => {
	const comment = useField('text')
	const { error, isLoading, startFetch, setQuery } = useAsync()

	const handleSubmit = (e) => {
		e.preventDefault()
		setQuery(() => addComments({ content: comment.value, blogId: blogId }))
		startFetch()
	}
	return (
		<div>
			{ isLoading ? <div>adding comment..</div> :
				error ? <div>{error}</div> :
					null
			}
			<form onSubmit={handleSubmit}>
				<label>
					<input {...comment} />
				</label>
				<button type="submit">Add comment</button>
			</form>
		</div>
	)
}



const Blog = () => {
	const { blogId } = useParams()
	const [details, setDetails] = useState(false)
	const { isLoading: commentStatus, error: commentsError, startFetch } = useAsync(fetchComments(blogId))
	const blog = useSelector((state) => selectBlogById(state, blogId))
	console.log(blog)
	const comments = blog.comments.some( (comment) => typeof comment == 'object') ? blog.comments : null

	useEffect(() => {
		if(!comments){
			startFetch()
		}
	},[comments])

	console.log(blog)
	return (
		<div>
			<div>
				<h2>{blog.title} by {blog.user.username}</h2>
				<button onClick={() => {setDetails(!details)}}>show details</button>
			</div>
			{ details ? <BlogBody blog={blog}/> : null }
			<BlogComments comments={comments} isLoading={commentStatus} error={commentsError} />
			<CommentForm blogId={blogId} />
		</div>
	)
}

export default Blog