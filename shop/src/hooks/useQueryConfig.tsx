import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import useQueryParams from './useQueryParams'
import type { ProductRequest } from '../types/product'

export type QueryConfig = {
  [key in keyof ProductRequest]: string
}

export default function useQueryConfig() {
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      pageNo: queryParams.pageNo || "1",
      pageSize: queryParams.pageSize || "15",
      sortBy: queryParams.sortBy,
      productId: queryParams.productId,
      name: queryParams.name,
      order: queryParams.order,
      priceMax: queryParams.priceMax,
      priceMin: queryParams.priceMin,
      rating: queryParams.rating,
      categoryId: queryParams.categoryId
    },
    isUndefined
  )
  return queryConfig
}
