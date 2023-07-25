import axios from 'axios'

export const httpRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 100000,
  headers: {
    authorization: 'API-KEY',
    ['X-API-KEY']: 'P-3zr6vqkCPw6z30rwKxnIO1DEWMyMA6ge',
  },
})
export const httpSingleRequest = axios.create({
  baseURL: 'https://api.admin.u-code.io/v1/object/',
  timeout: 100000,
  headers: {
    authorization: 'API-KEY',
    ['X-API-KEY']: 'P-3zr6vqkCPw6z30rwKxnIO1DEWMyMA6ge',
  },
})

const errorHandler = (error, hooks) => {
  return Promise.reject(error.response)
}

httpRequest.interceptors.request.use((config) => {
  // const token = authStore.token.access_token

  const token = ''

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  // config.headers['X-API-KEY'] = 'fino1'

  return config
})

httpRequest.interceptors.response.use(
  (response) => response.data.data,
  errorHandler
)

export default httpRequest
