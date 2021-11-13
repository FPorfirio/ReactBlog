import React from 'react'
import { Alert, AlertIcon, AlertDescription, Spinner } from '@chakra-ui/react'

const StatusBox = ({ isLoading, status }) => {
  return (
    <>
      {isLoading ? <Spinner /> : null}
      {status ? (
        <Alert status={status.type}>
          <AlertIcon />
          <AlertDescription>{status.message}</AlertDescription>
        </Alert>
      ) : null}
    </>
  )
}

export default StatusBox
