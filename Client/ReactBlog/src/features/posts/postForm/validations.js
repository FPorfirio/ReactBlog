export const validateTitle = (title) => {
  let error = null

  if (title.length < 5) {
    error = 'Title must be at least 5 characters length'
  }
  if (title.length > 50) {
    error = 'Title must have a maximun of 50 characters'
  }
  return error
}

export const validateContent = (content) => {
  let error = null

  if (content.length < 50) {
    error = 'Post must be at least 50 characters length'
  }
  if (content.length > 400) {
    error = 'Post must have a maximun of 400 characters'
  }
  return error
}

export const validateTags = (tags) => {
  let error = null

  if (tags.length < 2) {
    error = 'Invalid tax sintax'
  }

  return error
}

export const validateDescription = (description) => {
  let error = null

  if (description.length > 50) {
    error = 'Description must have 50 characters or less'
  }

  return error
}
