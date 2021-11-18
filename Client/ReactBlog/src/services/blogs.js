import axios from 'axios'
import { config } from './config'
const { baseUrl, getStore } = config

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
  baseURL: `${config.baseUrl}/api/blogs`,
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

const getAll = async () => {
  const request = await instance.get()
  return request.data
}

const get = async (id) => {
  const request = await instance.get(`/${id}`)
  return request.data
}

const getBlogsByUser = async (userId) => {
  const response = await instance.get(`?userId=${userId}`)
  return response.data
}
//arreglar la url

const create = async (newObject) => {
  const response = await instance.post('/', newObject)
  return response.data
}

const update = async (updatedBlog) => {
  const response = await instance.put(
    `${baseUrl}/${updatedBlog.id}`,
    updatedBlog.fields
  )
  return response.data
}

const deletePost = async (id) => {
  const response = await instance.delete(`/${id}`)
  return response.data
}

export default {
  getAll,
  get,
  create,
  update,
  deletePost,
  getBlogsByUser,
}
