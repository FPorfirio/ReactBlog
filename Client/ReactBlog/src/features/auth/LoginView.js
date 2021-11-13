import React, { useState } from 'react'
import { selectStatus, selectError, login } from './authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import { LoginForm } from './loginForm/LoginForm'
import ErrorBox from '../../common/components/ErrorBox'
import { Icon } from '@chakra-ui/react'
import { ReactComponent as UserIcon } from '../../assets/user.svg'

export const LoginView = ({ closeModal }) => {
  const dispatch = useDispatch()
  const status = useSelector(selectStatus)
  const requestError = useSelector(selectError)
  const [inputError, setInputError] = useState('')

  const formHandler = (name, password, e) => {
    e.preventDefault()
    if (!name.value.length) {
      setInputError('name')
      console.log()
      return
    } else if (!password.value.length) {
      setInputError('password')
      return
    }
    setInputError('')
    const credentials = {
      username: name.value,
      password: password.value,
    }
    dispatch(login(credentials))
  }

  if (status == 'success') {
    return <Redirect to="/" />
  }

  return (
    <div className="flex flex-col md:w-96 md:mx-auto mt-8 gap-12 bg-azure">
      <div className="bg-cadet flex justify-center bg-cadet-blue">
        <Icon as={UserIcon} alignSelf="center" w="6rem" h="10rem" />
      </div>

      <ErrorBox
        error={
          inputError
            ? { type: 'inputError', value: inputError }
            : requestError
            ? { type: 'requestError', value: requestError }
            : null
        }
      />

      <LoginForm
        className="mx-3"
        formHandler={formHandler}
        status={status}
        closeModal={closeModal}
      />
    </div>
  )
}
