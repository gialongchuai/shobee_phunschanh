import classNames from 'classnames'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import omit from 'lodash/omit'
import type { QueryConfig } from '../../../../hooks/useQueryConfig'
import type { ProductRequest } from '../../../../types/product'
import path from '../../../../constants/path'
import { sortBy as sortField, order as orderConstant } from '../../../../constants/product'
interface Props {
  queryConfig: QueryConfig
  totalPages: number
}

export default function SortProductList({ queryConfig, totalPages }: Props) {
  const page = Number(queryConfig.pageNo)
  const { sortBy = sortField.createdAt, order } = queryConfig
  const navigate = useNavigate()

  const isActiveSortBy = (sortByValue: Exclude<ProductRequest['sortBy'], undefined>) => {
    return sortBy === sortByValue
  }

  const handleSort = (sortByValue: Exclude<ProductRequest['sortBy'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sortBy: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }

  const handlePriceOrder = (orderValue: Exclude<ProductRequest['order'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sortBy: sortField.price,
        order: orderValue
      }).toString()
    })
  }

  return (
    <div className='bg-gray-300/40 py-4 px-3'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <div>Sắp xếp theo</div>
          <button
            className={classNames('h-8 px-4 text-center text-sm capitalize ', {
              'bg-purple-400 text-white hover:bg-purple-400/80': isActiveSortBy(sortField.view),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortField.view)
            })}
            onClick={() => handleSort(sortField.view)}
          >
            Phổ biến
          </button>
          <button
            className={classNames('h-8 px-4 text-center text-sm capitalize ', {
              'bg-purple-400 text-white hover:bg-purple-400/80': isActiveSortBy(sortField.createdAt),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortField.createdAt)
            })}
            onClick={() => handleSort(sortField.createdAt)}
          >
            Mới nhất
          </button>
          <button
            className={classNames('h-8 px-4 text-center text-sm capitalize ', {
              'bg-purple-400 text-white hover:bg-purple-400/80': isActiveSortBy(sortField.sold),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortField.sold)
            })}
            onClick={() => handleSort(sortField.sold)}
          >
            Bán chạy
          </button>
          <select
            className={classNames('h-8  px-4 text-left text-sm capitalize  outline-none ', {
              'bg-purple-400 text-white hover:bg-purple-400/80': isActiveSortBy(sortField.price),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortField.price)
            })}
            value={order || ''}
            onChange={(event) => handlePriceOrder(event.target.value as Exclude<ProductRequest['order'], undefined>)}
          >
            <option value='' disabled className='bg-white text-black'>
              Giá
            </option>
            <option value={orderConstant.asc} className='bg-white text-black'>
              Giá: Thấp đến cao
            </option>
            <option value={orderConstant.desc} className='bg-white text-black'>
              Giá: Cao đến thấp
            </option>
          </select>
        </div>

        <div className='flex items-center'>
          <div>
            <span className='text-purple-400'>{page}</span>
            <span>/{totalPages}</span>
          </div>
          <div className='ml-2 flex'>
            {page === 1 ? (
              <span className='flex h-8 w-9 cursor-not-allowed items-center justify-center rounded-tl-sm rounded-bl-sm bg-white/60  shadow hover:bg-slate-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    pageNo: (page - 1).toString()
                  }).toString()
                }}
                className='flex h-8 w-9  items-center justify-center rounded-tl-sm rounded-bl-sm bg-white  shadow hover:bg-slate-100'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                </svg>
              </Link>
            )}
            {page === totalPages ? (
              <span className='flex h-8 w-9 cursor-not-allowed items-center justify-center rounded-tl-sm rounded-bl-sm bg-white/60  shadow hover:bg-slate-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    pageNo: (page + 1).toString()
                  }).toString()
                }}
                className='flex h-8 w-9  items-center justify-center rounded-tl-sm rounded-bl-sm bg-white  shadow hover:bg-slate-100'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
