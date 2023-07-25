import httpRequest from './httpRequest'
import { useQuery } from 'react-query'

export const categoryService = {
  getList: (params) => httpRequest.get('categories', { params }),
}
