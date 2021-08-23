import axios from 'axios'

let store

export const injectStore = (_store) => {
	store = _store
}

const baseUrl = '/api/blogs'

const instance = axios.create({
	baseUrl: '/api/blogs'
})

instance.interceptors.request.use(config => {
	const token = `bearer ${store.getState().authentication.token}`
	console.log(token)
	config.headers.post['Authorization'] = token
	config.headers.put['Authorization'] = token
	config.headers.delete['Authorization'] = token
	return config
})

const getAll = async () => {
	const request = await instance.get(baseUrl)
	return request.data
}

const get = (id) => {
	const request = axios.get(`${baseUrl}/${id}`)
	return request.data
}

const create = async newObject => {
	const response = await instance.post(baseUrl, newObject)
	console.log(response)
	return response.data
}

const update = async (updatedBlog) => {
	const response = await instance.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog.fields)
	return response.data
}

const deletePost = async (id) => {
	const response = await instance.delete(`${baseUrl}/${id}`)
	console.log(response)
	return response.data
}

const getBlogComments = async (blogId) => {
	const response = await instance.get(`/api/comments?blogId=${blogId}`)
	return response.data
}

const getBlogsByUser = async (userId) => {
	const response = await instance.get(`/api/blogs?userId=${userId}`)
	return response.data
}

const addBlogComment = async (newComment) => {
	console.log(instance.post)
	const response = await instance.post('/api/comments/', newComment)
	console.log(response)
	return response.data
}
export default { getAll, get, create, update, deletePost, getBlogComments, addBlogComment, getBlogsByUser }