import axios from 'axios'
//https://api.admin.u-code.io/v1/invoke_function/ninioshop-create-order?project-id=0a388658-9756-49f9-9a2b-46efb7fb4fac
const httpSingleRequest = axios.create({
  baseURL: 'https://api.admin.u-code.io/v1/',
  timeout: 100000,
  headers: {
    authorization: 'API-KEY',
    ['X-API-KEY']: 'P-3zr6vqkCPw6z30rwKxnIO1DEWMyMA6ge',
  },
})

export const invokeFunction = {
  post: (data) => httpSingleRequest.post('invoke_function/ninioshop-create-order?project-id=0a388658-9756-49f9-9a2b-46efb7fb4fac', { data })
}
