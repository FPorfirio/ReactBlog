import { useReducer, useState, useRef, useEffect } from 'react'
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

/*export const useAsync = (promise) => {
	const dispatch = useDispatch()
	const [state, setState] = useState({
		data: null,
		error: null,
		isLoading: false
	})
	const runPromise = async () => {
		setState({
			data: null,
			error: null,
			isLoading: true
		})
		try {
			const response = await dispatch(promise())
			setState({
				data: response.payload,
				error: null,
				isLoading: false
			})
		} catch(err) {
			setState({
				data: null,
				error: err,
				isLoading: false
			})
		}
	}
	*/

export const useAsync = (promise = null) => {
	console.log('fuckshit')
	const dispatch = useDispatch()
	const [query, setQuery] = useState(() => promise)
	const queryRef = useRef(query)
	const [state, setState] = useState({
		data: null,
		error: null,
		isLoading: false
	})
	const [runFetch, setRunFetch] = useState(false)

	useEffect( () => {
		queryRef.current = query
		if(runFetch){
			runPromise()
		}
	}, [runFetch])


	const startFetch = () => {
		setState({
			data: null,
			error: null,
			isLoading: false
		})
		setRunFetch(true)
	}

	const runPromise = async () => {
		setRunFetch(false)
		setState({
			data: null,
			error: null,
			isLoading: true
		})
		try {
			const response = await dispatch(query)
			if(response.error){
				throw new Error(response.error.message)
			}
			setState({
				data: response.payload,
				error: null,
				isLoading: false
			})
		} catch (err) {
			setState({
				data: null,
				error: err.message,
				isLoading:false
			})
		}
	}
	return {
		startFetch,
		data: state.data,
		error: state.error,
		isLoading: state.isLoading,
		setQuery: setQuery
	}
}



export const useCrud = (initialState) => {

	const reducer = (state, action) => {
		switch(action.type) {
			case 'ADD':
				return {
					...state,
					action
				}
		}
	}
	console.log(reducer)
	const [state, dispatch] = useReducer()
	console.log(state, dispatch)
}