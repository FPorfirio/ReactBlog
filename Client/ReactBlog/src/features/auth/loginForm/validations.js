export const validateName = (username) => {
  let error = ''

  if (username.length < 5) {
    error = 'username must be 5 characters long'
  }

  return error
}

export const validatePassword = (password) => {
  let error

  if (password.length < 6) {
    error = 'password must contain 6 or more characters'
  }

  return error
}
