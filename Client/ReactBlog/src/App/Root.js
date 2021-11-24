import React from 'react'
import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import Theme from '../common/themes/chakrauiTheme'
import store from './store'
import ErrorBoundary from '../common/components/ErrorBoundary'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'

const Root = () => {
  return (
    <Provider store={store}>
      <ChakraProvider theme={Theme}>
        <ErrorBoundary>
          <Router basename="/ReactBlog">
            <ErrorBoundary>
              <App />
            </ErrorBoundary>
          </Router>
        </ErrorBoundary>
      </ChakraProvider>
    </Provider>
  )
}

export default Root
