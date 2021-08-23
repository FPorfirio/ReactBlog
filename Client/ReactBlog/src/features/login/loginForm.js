import React from 'react'
import { useField } from '../../common/hooks'
import { login, selectStatus, selectError } from './authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'

const LoginForm = () => {
	const dispatch = useDispatch()
	const name = useField('text')
	const password = useField('password')

	const formHandler = (e) => {
		e.preventDefault()
		const credentials = {
			username: name.value,
			password: password.value
		}
		dispatch(login(credentials))
	}

	return (
		<div>
			<form onSubmit={formHandler}>
				Name:<input {...name} />
				Password:<input {...password} />
				<button type="submit">Login</button>
			</form>
		</div>
	)
}

const ShowStatus = ({ status }) => {
	switch (status) {
		case 'idle':
		case 'success':
			return null
		case 'pending':
			return (
				<div>login in..</div>
			)
	}
}

const LoginPage = () => {
	const status = useSelector(selectStatus)
	const error = useSelector(selectError)
	console.log(status)
	if(status == 'success'){
		return <Redirect to="/" />
	} else {
		return (
			<div>
				<LoginForm />
				<ShowStatus status={status} />
				{error ? <div>{error}</div> : null}
			</div>
		)
	}
}


export default LoginPage