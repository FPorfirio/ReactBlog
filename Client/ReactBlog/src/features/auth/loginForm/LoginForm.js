import React from 'react'
import { useField } from '../../../common/hooks'
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react'
import { validateName, validatePassword } from './validations'

export const LoginForm = ({ className, formHandler, status, closeModal }) => {
  const name = useField({ type: 'text', validator: validateName })
  const password = useField({ type: 'password', validator: validatePassword })
  const isLoading = status == 'loading' ? true : false

  return (
    <div className={className}>
      <form
        onSubmit={(e) => {
          formHandler(name, password, e)
        }}
      >
        <FormControl id="userName" isInvalid={name.error}>
          <FormLabel>Username</FormLabel>
          <Input
            placeholder="Enter your username"
            value={name.value}
            onChange={name.onChange}
            type={name.type}
          />
          <FormErrorMessage>{name.error}</FormErrorMessage>
        </FormControl>
        <FormControl id="password" isInvalid={password.error}>
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="Enter your password"
            value={password.value}
            onChange={password.onChange}
            type={password.type}
          />
          <FormErrorMessage>{password.error}</FormErrorMessage>
        </FormControl>
        <div className="my-3 flex gap-1">
          <Button
            isLoading={isLoading}
            loadingText="Login in"
            spinnerPlacement="end"
            bg="cadetBlue"
            color="white"
            w="100%"
            type="submit"
          >
            Login
          </Button>
          <Button
            onClick={closeModal}
            colorScheme="teal"
            variant="outline"
            w="100%"
            type="button"
          >
            Go Back
          </Button>
        </div>
      </form>
    </div>
  )
}
