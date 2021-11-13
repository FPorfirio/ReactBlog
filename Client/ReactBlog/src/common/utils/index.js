const filterStatus = (error) => {
  const regexp = /\d+/
  console.log(error)
  return error.match(regexp)
}

export const createMessage = ({ status, field }) => {
  const filteredStatus = filterStatus(status) ? filterStatus(status)[0] : status
  let type
  let message

  console.log(filterStatus(status))
  switch (filteredStatus) {
    case '401':
      switch (field) {
        case 'login':
          message = 'Invalid Username or Password'
          type = 'error'
          break
        case 'comment':
          message = 'You must be loged in to post a comment'
          type = 'error'
          break
        case 'post':
          message = 'You must be loged in to make a post'
          type = 'error'
      }
      break

    case 'empty':
      message = `${field} cannot be empty`
      type = 'error'
      break

    case 'select_error':
      message = `you have to select an ${field}`
      type = 'error'
      break

    case 'success':
      switch (field) {
        case 'post':
        case 'comment':
          message = `Your ${field} has been added`
          type = 'success'
          break
        case 'login':
          message = 'Login Success!'
          type = 'success'
      }
      break

    default:
      message = ''
      type = ''
  }
  return { type, message }
}
