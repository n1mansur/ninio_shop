import axios from 'axios'
const httpRequest = axios.create({
  baseURL: 'https://api.admin.u-code.io/v1/object-slim/get-list/',
  timeout: 100000,
  headers: {
    authorization: 'API-KEY',
    ['X-API-KEY']: 'P-3zr6vqkCPw6z30rwKxnIO1DEWMyMA6ge',
  },
})

export const footerService = {
  getList: (params) => httpRequest.get('footer', { params }),
}
//data={"with_relations":true}&offset=1&limit=10