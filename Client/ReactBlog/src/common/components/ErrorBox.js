import React from 'react'
import { Box, Text } from '@chakra-ui/react'

const ErrorBox = ({ className, error }) => {
  let errorMessage

  switch (error?.type) {
    case 'requestError':
      errorMessage = 'Invalid Username or Password'
      break
    case 'inputError':
      errorMessage = `${error.value} cannot be empty`
      break
    default:
      errorMessage = null
  }

  return (
    errorMessage && (
      <Box
        {...className}
        display="flex"
        flexDir="column"
        minHeight="3rem"
        py="0.5rem"
        pl="0.5rem"
        borderLeft="0.5rem solid"
        borderColor="#c63535"
        boxShadow="dark-lg"
      >
        <Text color="#c63535">{errorMessage}</Text>
      </Box>
    )
  )
}

export default ErrorBox
