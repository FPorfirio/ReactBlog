import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useAsync } from '../../common/hooks'
import { fetchBlogs, selectAllBlogs, addBlog } from './blogsSlice'
import { Link } from 'react-router-dom'
import BlogForm from './blogForm'
import { Paper, Text, Anchor } from '@mantine/core'

const ListContent = ({ blogs, isLoading, blogError }) => {

	if(isLoading){
		return  <div className="loader">Loading...</div>
	} else if(blogError) {
		return <div>{blogError}</div>
	}

	return (
		<div className=' bg-main-panel mx-auto p-4'>
			<ul className='flex flex-wrap gap-3 justify-center bg-lavender shadow-inner p-1'>
				{
					blogs.map( blog => {
						return (
							<li className='w-full' key={blog.id}>
								<Paper style={{ height: '3rem', display:'flex', flexWrap:'Wrap', alignItems: 'flex-end', paddingLeft: '1rem' }} shadow="xl" >
									<Anchor component={Link} to={`/blogs/${blog.id}`}>{blog.title}</Anchor>
									<Text className='inline-block ml-1' weight='700' transform='capitalize'>by {blog.author}</Text>
								</Paper>
							</li>
						)
					})
				}
			</ul>
		</div>
	)
}


const BlogList = () => {
	const dispatch = useDispatch()
	const cacheBlogs = useSelector(selectAllBlogs)
	const { error, isLoading, startFetch } = useAsync(fetchBlogs())

	useEffect(() => {
		if (!cacheBlogs.length) {
			startFetch()
		}
	}, [])

	const formHandler = (newBlog) => {
		dispatch(addBlog(newBlog))
	}
	console.log(formHandler, BlogForm)

	return (
		<ListContent blogs={cacheBlogs} isLoading={isLoading} blogError={error} />
	)
}

export default BlogList