import React from 'react'
import { useField } from '../../common/hooks'
import { TextInput, Button } from '@mantine/core'

const blogForm = ({ formHandler }) => {
	const title = useField('text')
	const author = useField('text')
	const url = useField('text')

	const addComment = (e) => {
		e.preventDefault()
		const newBlog = {
			title: title.value,
			author: author.value,
			url: url.value
		}
		formHandler(newBlog)
	}

	return (
		<form onSubmit={addComment}>
			<TextInput
				{...title}
				label='Title'
				placeholder='Must be at least 4 characters long'
			/>
			<TextInput
				{...author}
				label='Author'
				placeholder='Author name'
			/>
			<TextInput
				{...url}
				label='Url'
				placeholder='Article Link'
			/>

			<Button
				variant='filled'
				styles={{
					root: {
						marginTop: '2rem',
						background: '#C4B5FD',
						color:'#484554'
					}
				}}
				color='C4B5FD'
				type='submit'>
				Add Blog
			</Button>
		</form>
	)
}

export default blogForm