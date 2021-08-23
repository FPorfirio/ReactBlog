import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'
import PostForm from './PostForm'

describe('testing toggable component', () => {

  const deleteHandler = jest.fn()

  const updateHandler = jest.fn()

  const blog = {
    user: { name: 'pocho', username: 'lavezi' },
    author: 'mike' ,
    likes: 5 ,
    title: 'the road' ,
    url: 'www.mike.com'
  }
  beforeEach(() => {
    render(
      <Blog blog={blog} updatePost={updateHandler} deletePost={deleteHandler} />
    )
  })

  test('blog title and user will be rendered, likes and url not', () => {
    expect(screen.getByText(`${blog.title} ${blog.user.username}`)).toBeDefined()
    const url = screen.queryByText(blog.url)
    const likes = screen.queryByText(`${blog.likes}`)
    expect(likes).not.toBeInTheDocument()
    expect(url).not.toBeInTheDocument()
  })

  test('click show button renders blog details', () => {
    const button = screen.getByText('show')
    fireEvent.click(button)
    const url = screen.queryByText(blog.url)
    const likes = screen.queryByText(`${blog.likes}`)
    expect(likes).toBeInTheDocument()
    expect(url).toBeInTheDocument()
  })

  test('like button fire event handler', () => {
    const button = screen.getByText('show')
    fireEvent.click(button)
    const likeButton = screen.getByText('Like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(updateHandler.mock.calls).toHaveLength(2)
  })

  test('the form submit with the correct fields', () => {
    const submitHandler = jest.fn()
    const { container } = render(<PostForm createPost={submitHandler}/>)
    const title = screen.getByLabelText('Title')
    const author = screen.getByLabelText('Author')
    const url = screen.getByLabelText('Url')
    const form = container.querySelector('form')

    fireEvent.change(title, { target: { value: 'testing title' } })
    fireEvent.change(author, { target: { value: 'testing author' } })
    fireEvent.change(url, { target: { value: 'testing url' } })
    fireEvent.submit(form)

    console.log(submitHandler.mock.calls[0][0])
    expect(submitHandler.mock.calls[0][0].title).toBe('testing title')
    expect(submitHandler.mock.calls[0][0].author).toBe('testing author')
    expect(submitHandler.mock.calls[0][0].url).toBe('testing url')
  })
})