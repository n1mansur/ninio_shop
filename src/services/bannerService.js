import httpRequest from './httpRequest'
import { useQuery } from 'react-query'

export const bannerService = {
  getList: (params) => httpRequest.get('banner', { params }),
}
