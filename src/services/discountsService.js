import httpRequest, { httpSingleRequest } from './httpRequest'

import { useQuery } from 'react-query'
//https://api.admin.u-code.io/v1/object-slim/get-list/discounts?data={"with_relations":true}
export const discountsService = {
  getList: (params) => httpRequest.get('discounts', { params }),
  getById: (id) => httpSingleRequest.get(`discounts/${id + '?project-id=0a388658-9756-49f9-9a2b-46efb7fb4fac'}`),
}

export const useDiscountsQuery = ({ params = {}, queryParams }) => {
  return useQuery(
    ['PRODUCTS', params],
    () => discountsService.getList(params),
    queryParams
  )
}
