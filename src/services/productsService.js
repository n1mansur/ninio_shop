import httpRequest, { httpSingleRequest } from './httpRequest'

import { useQuery } from 'react-query'

export const productsService = {
  getList: (params) => httpRequest.get('products', { params }),
  getById: (id) => httpSingleRequest.get(`products/${id + '?project-id=0a388658-9756-49f9-9a2b-46efb7fb4fac'}`),
}

export const useProductsQuery = ({ params = {}, queryParams }) => {
  return useQuery(
    ['PRODUCTS', params],
    () => productsService.getList(params),
    queryParams
  )
}

//export const useSingleProductQuery = ({ params, queryParams }) => {
//  return useQuery(
//    ['PRODUCT', params],
//    () => productsService.getSingle(params),
//    queryParams
//  )
//}
