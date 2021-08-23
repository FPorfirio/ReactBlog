import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { useAsync } from '../../common/hooks'
import { selectBlogsByUser, fetchBlogsby } from '../blogs/blogsSlice'
import { Link } from 'react-router-dom'
import { selectUserById, fetchUser } from './userSlice'
import { Tab, Tabs } from '@mantine/core'


const UserBody = ({ user, blogs, isLoading, error }) => {

	if(isLoading){
		console.log(isLoading)
		return  <div className="loader">Loading...</div>
	} else if(error) {
		return <div>{error}</div>
	} else if(!user){
		return null
	}

	return (
		<div>
			<h2>{user.username}</h2>
			<section>
				<Tabs>
					<Tab label='Blogs'><h3>added blogs</h3>
						<ul>
							{blogs.map( blog =>
								<li key={blog.id}>
									<Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
								</li>
							)}
						</ul>
					</Tab>
					<Tab label='Comments'>Comments</Tab>
				</Tabs>
			</section>
		</div>
	)

}

const singleUser = () => {
	const { userId } = useParams()
	const { isLoading: userLoading, error: userError, startFetch: startUserFetch } = useAsync(fetchUser(userId))
	const { isLoading: blogsLoading, error: blogError, startFetch: startBlogFetch } = useAsync(fetchBlogsby({ type: 'user', id: userId }))
	const isLoading = userLoading || blogsLoading
	const error = userError ? userError
		: blogError ? blogError
			: null
	const user = useSelector((state) => selectUserById(state, userId))
	const blogs = useSelector((state) => selectBlogsByUser(state, userId))

	useEffect(() => {
		if(!user || !blogs.length) {
			startBlogFetch()
			startUserFetch()
		}
	},[])

	return (
		<div>
			<UserBody user={user} blogs={blogs} isLoading={isLoading} error={error} />
		</div>
	)
}

export default singleUser