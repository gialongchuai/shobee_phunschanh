import { useQuery } from '@tanstack/react-query'
import type { ProductRequest } from '../../types/product'
import useQueryConfig from '../../hooks/useQueryConfig'
import { productApi } from '../../apis/product'
import Product from './components/Product'
import Pagination from '../../components/Pagination'
import SortProductList from '../SortProductList'
import categoryApi from '../../apis/category'
import AsideFilter from '../../components/AsideFilter'

export default function ProductList() {
  const queryConfig = useQueryConfig()

  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductRequest)
    },
    placeholderData: previousData => previousData,
    staleTime: 3 * 60 * 1000
  })

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.getCategories()
    }
  })

  return (
    <div className='bg-gray-200 py-6'>
      <div>
        <title>Trang chủ | Shopee Clone</title>
        <meta name='description' content='Trang chủ dự án Shopee Clone' />
      </div>
      <div className='container'>
        {productsData && (
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-3'>
              <AsideFilter queryConfig={queryConfig} categories={categoriesData?.data.result || []} />
            </div>
            <div className='col-span-9'>
              <SortProductList queryConfig={queryConfig} totalPages={productsData.data.result.totalPages} />
              <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {productsData.data.result.items.map((product) => (
                  <div className='col-span-1' key={product.id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              <Pagination queryConfig={queryConfig} totalPages={productsData.data.result.totalPages} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
