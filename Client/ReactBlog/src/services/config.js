let baseUrl
let store
switch (process.env.NODE_ENV) {
  case 'production':
    baseUrl = 'https://reactblog-backend.herokuapp.com'
    break
  default:
    baseUrl = ''
}

export const injectStore = (_store) => {
  store = _store
}

const getStore = () => {
  return store
}

export const config = {
  baseUrl,
  store,
  getStore,
}
