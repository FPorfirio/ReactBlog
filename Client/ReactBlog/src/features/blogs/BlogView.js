import React from 'react'
import BlogList from './blogList'
import BlogIcon from '../../assets/post.js'
import { Title } from '@mantine/core'

//background content-box y linear-gradient(45deg, black, transparent) lightcyan 142039

const BlogView = () => {

	return (
		<div className='col-span-3 bg-main-texture'>
			<main className='ml-44 mr-5'>
				<header className='flex flex-wrap mt-3 shadow-xl h-44 text-header-color pt-5 pl-6 gap-5 bg-gradient-to-r from-header-gradient1 to-header-gradient2'>
					<Title order={2} style={{ fontFamily: 'Abril Fatface, cursive', fontSize: '5.5rem', color:'lightcyan' }}>Blogs</Title>
					<BlogIcon height='7.5rem' />
				</header>
				<BlogList />
			</main>
		</div>
	)
}

export default BlogView