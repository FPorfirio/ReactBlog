import React from 'react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { LoginModal } from '../../features/auth/login'

const LoginBox = () => {
  return (
    <div className="ml-auto mr-1.5 md:mr-11 mt-4">
      <ButtonGroup variant="solid" colorScheme="lightTeal">
        <LoginModal />
        <Button>Sign Up</Button>
      </ButtonGroup>
    </div>
  )
}

export default LoginBox
