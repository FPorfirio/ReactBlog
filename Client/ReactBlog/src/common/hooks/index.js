import { useReducer, useState, useRef, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
export const useField = ({ type, validator }) => {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (validator && value) {
      const validation = validator(value)
      if (validation) {
        setError(validation)
        return
      }
    }
    setError('')
  }, [value])

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const reset = (e) => {
    setValue('')
  }

  return {
    type,
    onChange,
    reset,
    value,
    setValue,
    error,
  }
}

export const useHookWithRefCallback = () => {
  const ref = useRef(null)
  const setRef = useCallback((node) => {
    if (ref.current) {
      console.log(ref)
    }

    if (node) {
      // Check if a node is actually passed. Otherwise node would be null.
      // You can now do what you need to, addEventListeners, measure, etc.
    }

    // Save a reference to the node
    ref.current = node
  }, [])

  return [setRef]
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
  const dispatch = useDispatch()
  const [query, setQuery] = useState(() => promise)
  const [state, setState] = useState({
    data: null,
    error: null,
    isLoading: false,
  })
  const [runFetch, setRunFetch] = useState(false)
  const abort = useRef()
  const isMounted = useRef(true)

  const callAbort = () => () => {
    abort.current.abort()
  }

  useEffect(() => {
    if (runFetch) {
      runPromise()
    }
  }, [runFetch])

  const startFetch = () => {
    setState({
      data: null,
      error: null,
      isLoading: false,
    })
    setRunFetch(true)
  }

  const runPromise = async () => {
    const cancelRequest = callAbort()
    setRunFetch(false)
    setState({
      data: null,
      error: null,
      isLoading: true,
    })

    try {
      const dispatchAction = dispatch(query)
      abort.current = dispatchAction
      const response = await dispatchAction

      if (response.error) {
        throw new Error(response.error.message)
      }
      if (!isMounted.current) {
        cancelRequest()
        throw new Error('AbortError')
      }
      setState({
        data: response.payload,
        error: null,
        isLoading: false,
      })
    } catch (err) {
      if (err.message == 'AbortError') {
        return
      }
      setState({
        data: null,
        error: err.message,
        isLoading: false,
      })
    }
  }

  return {
    data: state.data,
    error: state.error,
    isLoading: state.isLoading,
    setQuery,
    startFetch,
    abort: callAbort,
    isMounted,
  }
}

export const useCrud = (initialState) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'ADD':
        return {
          ...state,
          action,
        }
    }
  }
  const [state, dispatch] = useReducer()
}

export const ScrollTo = () => {
  const location = useLocation()
  const history = useHistory()
  const element = location.state
  useEffect(() => {
    if (element) {
      const unlisten = history.listen(() => {
        element()
      })
      return () => {
        unlisten()
      }
    }
  }, [location])

  return null
}

export function useRefWithCallback(ref) {
  const nodeRef = useRef(null)

  const setRef = useCallback((node) => {
    nodeRef.current = node

    if (nodeRef.current) {
      ref = nodeRef.current
    }
  }, [])

  return setRef
}
