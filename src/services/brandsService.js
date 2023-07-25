import httpRequest from './httpRequest'
import { useQuery } from 'react-query'

export const brandsService = {
  getList: (params) => httpRequest.get('brands', { params }),
}
