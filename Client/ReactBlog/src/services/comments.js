import axios from 'axios'
import { config } from './config'
const { getStore, baseUrl } = config

let cancel

const cancelToken = axios.CancelToken
export const callCancel = () => {
  return () => {
    if (cancel !== undefined) {
      cancel()
    }

    return
  }
}

const instance = axios.create({
  baseURL: `${baseUrl}/api/comments`,
})

instance.interceptors.request.use((config) => {
  const store = getStore()
  const token = `bearer ${store.getState().authentication.token}`
  config.headers.post['Authorization'] = token
  config.headers.put['Authorization'] = token
  config.headers.delete['Authorization'] = token
  config.cancelToken = new cancelToken(function executor(c) {
    cancel = c
  })

  return config
})

const getBlogComments = async (blogId) => {
  const response = await axios.get(`${baseUrl}/api/comments?blogId=${blogId}`)
  return response.data
}

const addBlogComment = async (newComment) => {
  const response = await instance.post(`${baseUrl}/api/comments/`, newComment)
  return response.data
}

export default {
  getBlogComments,
  addBlogComment,
}
