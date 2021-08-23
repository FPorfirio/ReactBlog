import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import '../index.css'

const LoginForm = React.forwardRef((props, ref) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const resetFields = () => {
		setUsername('')
		setPassword('')
	}
	useImperativeHandle(ref, () => {
		return {
			resetFields
		}
	})

	return (
		<form id='loginForm' onSubmit={(event) => {props.handleLogin(username, password, event)}} action="" method="post">
			<label htmlFor="username">
						username:
				<input onChange={({ target }) => {setUsername(target.value)}} type="text" value={username} name="" id=""/>
			</label>
			<label htmlFor="password">
						password:
				<input className='success' onChange={({ target }) => {setPassword(target.value)}} type="password" value={password} name="" id=""/>
			</label>
			<button type='submit'>Login</button>
		</form>
	)
})

LoginForm.propTypes = {
	handleLogin: PropTypes.func.isRequired
}

LoginForm.displayName = 'LoginForm'

export default LoginForm