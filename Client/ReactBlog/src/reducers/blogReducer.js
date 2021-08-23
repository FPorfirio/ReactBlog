import blogService from '..services/blogs'


export const createBlog = (blog) => {
	return async dispatch => {
		const newBlog = await blogService.create(blog)
		dispatch({
			type: 'NEW_BLOG',
			data: newBlog
		})
	}
}

export const likeBlog = (blog) => {
	return async dispatch => {
		const formatedBlog = {
			...blog,
			likes: blog.likes++
		}
		const updatedBlog = await blogService.update(formatedBlog)
		dispatch({
			type: 'LIKE_BLOG',
			data: updatedBlog
		})
	}
}

export const commentBlog = (id, comment) => {
	return async (dispatch, getState) => {
		const findBlog = getState.find( blog => blog.id == id)
		const formatedBlog = {
			...findBlog,
			comments: [...findBlog.comments,]
		}
		const updatedBlog = await blogService.update(formatedBlog)
		dispatch({
			type: 'COMMENT_BLOG',
			data: updatedBlog
		})
	}
}

export const getBlog = (id) => {
	return async (dispatch, getState) => {
		const findBlog = await blogService.get(id)
		dispatch({
			action: 'GET_BLOG',
			data: findBlog
		})
	}
}

const reducer = (state = { blog: {}, blogs: [] }, action) => {
	switch(action.type) {
		case 'NEW_BLOG':
			return { ...state, blogs: state.blogs.concat(action.data) }
		case 'LIKE_BLOG': {
			const updatedBlog = action.data
			const id = action.data.id
			const updatedBlogs = state.blogs.map( blog => blog.id != id ? blog : updatedBlog)
			return { ...state, blogs: updatedBlogs }
		}
		case 'GET_BLOG': {
			return { ...state, blog: action.data }
		}
	}
}

export default reducer