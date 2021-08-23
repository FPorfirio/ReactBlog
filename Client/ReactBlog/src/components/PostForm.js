import React, { useState } from 'react'
import PropTypes from 'prop-types'


const PostForm = ({ createPost }) => {
	const [postTitle, setPostTitle] = useState('')
	const [postAuthor, setPostAuthor] = useState('')
	const [postUrl, setPostUrl] = useState('')

	return (
		<div>
			<h2>Create new</h2>
			<form onSubmit={(event) => {createPost({ title: postTitle, author: postAuthor, url: postUrl }, event)}} action="" method="post">
				<label htmlFor="">
            Title
					<input onChange={({ target }) => {setPostTitle(target.value)}} type="text" value={postTitle} name="title" id=""/>
				</label>
				<label htmlFor="">
            Author
					<input onChange={({ target }) => {setPostAuthor(target.value)}} type="text" value={postAuthor} name="author" id=""/>
				</label>
				<label htmlFor="">
            Url
					<input onChange={({ target }) => {setPostUrl(target.value)}} type="text" value={postUrl} name="url" id=""/>
				</label>
				<button type='submit'>Submit</button>
			</form>
		</div>
	)
}

PostForm.propTypes = {
	createPost: PropTypes.func.isRequired
}

export default PostForm