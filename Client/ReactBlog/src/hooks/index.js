import { useState } from 'react'
import { useDispatch } from 'react-redux'

export const useField = (type) => {
	const [value, setValue] = useState('')

	const onChange = (e) => {
		setValue(e.target.value)
	}

	return {
		type,
		onChange,
		value
	}
}

export const useAsync = (promise = null) => {
	console.log('fuckshit')
	const dispatch = useDispatch()

	const [query, setQuery] = useState(promise)

	const [state, setState] = useState({
		data: null,
		error: null,
		isLoading: false
	})
	console.log(query)
	const waitPromise = async () => {
		try {
			const response = await dispatch(query())
			setState({
				data: response.payload,
				error: null,
				isLoading: false
			})
		} catch (err) {
			setState({
				data: null,
				error: err,
				isLoading:false
			})
		}
	}

	return {
		waitPromise,
		data: state.data,
		error: state.error,
		isLoading: state.isLoading,
		setQuery: setQuery
	}
}