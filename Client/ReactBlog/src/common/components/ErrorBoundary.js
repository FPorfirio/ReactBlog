import { Link as RouterLink } from 'react-router-dom'
import { Link } from '@chakra-ui/react'
import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.log(error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen bg-main-background">
          <h1>Something went wrong.</h1>
          <Link as={RouterLink} to="/">
            Go home
          </Link>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
