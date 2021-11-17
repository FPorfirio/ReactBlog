import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  isPending,
  isRejected,
} from '@reduxjs/toolkit'
import blogService from '../../services/blogs'
import commentService from '../../services/comments'
import { callCancel } from '../../services/blogs'

//cancel axios request
const axiosCancel = callCancel()

//async actions
export const fetchBlogs = createAsyncThunk(
  'blogs/fetchBlogs',
  async (param, { signal }) => {
    signal.addEventListener('abort', () => {
      axiosCancel()
    })
    const response = await blogService.getAll()
    return response
  }
)

export const fetchBlogsby = createAsyncThunk(
  'blog/fetchBlogsBy',
  async (filter) => {
    let response
    switch (filter.type) {
      case 'user':
        response = await blogService.getBlogsByUser(filter.id)
        return response
      case 'id':
        response = await blogService.get(filter.id)
        return response
    }
  }
)

export const addBlog = createAsyncThunk('blogs/newBlog', async (newBlog) => {
  const response = await blogService.create(newBlog)
  return response
})

export const updateBlog = createAsyncThunk(
  'blogs/editBlog',
  async (updatedBlog) => {
    const response = await blogService.update(updatedBlog)
    const formatedResponse = {
      id: response.id,
      changes: response,
    }
    return formatedResponse
  }
)

export const deleteBlog = createAsyncThunk('blogs/deleteBlog', async (id) => {
  const response = await blogService.deletePost(id)
  return response
})

export const fetchComments = createAsyncThunk(
  'blogs/fetchComments',
  async (blogId, { signal }) => {
    signal.addEventListener('abort', () => {
      axiosCancel()
    })
    const response = await commentService.getBlogComments(blogId)
    return response
  }
)

export const addComments = createAsyncThunk(
  'blogs/addComments',
  async (newComment) => {
    const response = await commentService.addBlogComment(newComment)
    return response
  }
)

//reducer logic
const blogAdapter = createEntityAdapter()

const initialState = blogAdapter.getInitialState({
  status: 'idle',
  error: null,
})

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = 'succeded'
        blogAdapter.setAll(state, action.payload)
      })
      .addCase(fetchBlogsby.fulfilled, (state, action) => {
        if (action.meta.arg.type == 'id') {
          blogAdapter.upsertOne(state, action.payload)
        } else {
          blogAdapter.upsertMany(state, action.payload)
        }
        state.status = 'succeded'
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        state.status = 'succeded'
        blogAdapter.addOne(state, action.payload)
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        ;(state.status = 'succeded'),
          blogAdapter.updateOne(state, action.payload)
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        const id = action.meta.arg
        state.entities[id].comments = action.payload
      })
      .addCase(addComments.fulfilled, (state, action) => {
        const id = action.meta.arg.blogId
        state.entities[id].comments.push(action.payload)
      })
      .addMatcher(
        isPending(fetchBlogs, addBlog, updateBlog, deleteBlog),
        (state, action) => {
          state.status = 'loading'
        }
      )
      .addMatcher(
        isRejected(fetchBlogs, addBlog, updateBlog, deleteBlog),
        (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
        }
      )
  },
})

//selectors
export const {
  selectAll: selectAllBlogs,
  selectById: selectBlogById,
  selectIds: selectBlogIds,
} = blogAdapter.getSelectors((state) => state.blogs)

export const selectBlogStatus = (state) => state.blogs.status

export const selectBlogError = (state) => state.blogs.error

export const selectLikes = (state, id) => {
  const blog = selectBlogById(state, id)
  return blog.likes
}

export const selectBlogComments = (state, id) => {
  const blog = selectBlogById(state, id)
  return blog.comments
}

export const selectBlogsByUser = createSelector(
  [selectAllBlogs, (state, userId) => userId],
  (blogs, userId) => blogs.filter((blog) => blog.user == userId)
)

export default blogSlice.reducer
