import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import { Controller, useForm } from "react-hook-form";
import { createSearchParams, Link, useNavigate } from "react-router-dom";
import path from "../../constants/path";
import type { QueryConfig } from "../../hooks/useQueryConfig";
import type { Category } from "../../types/category";
import { schema, type Schema } from "../../utils/rules";
import Button from "../Button";
import InputNumber from "../InputNumber";
import { omit } from "lodash";
import RatingStars from "../RatingStars";

interface Props {
  queryConfig: QueryConfig;
  categories: Category[];
}

type FormData = Pick<Schema, 'priceMin' | 'priceMax'>

const priceSchema = schema.pick(['priceMin', 'priceMax'])

/**
 * Rule validate
 * Nếu có price_min và price_max thì price_max >= price_min
 * Còn không thì có price_min thì không có price_max và ngược lại
 */

export default function AsideFilter({ queryConfig, categories }: Props) {
  //   const { t } = useTranslation('home')
  const { categoryId } = queryConfig;
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      priceMin: "",
      priceMax: "",
    },
    resolver: yupResolver(priceSchema),
  });
  const navigate = useNavigate();
  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        priceMax: data.priceMax,
        priceMin: data.priceMin,
      }).toString(),
    });
  });

    const handleRemoveAll = () => {
      navigate({
        pathname: path.home,
        search: createSearchParams(omit(queryConfig, ['priceMin', 'priceMax', 'rating', 'category'])).toString()
      })
    }

  return (
    <div className="py-4">
      <Link
        to={path.home}
        className={classNames("flex items-center font-bold", {
          "text-purple-400": !categoryId,
        })}
      >
        <svg viewBox="0 0 12 10" className="mr-3 h-4 w-3 fill-current">
          <g fillRule="evenodd" stroke="none" strokeWidth={1}>
            <g transform="translate(-373 -208)">
              <g transform="translate(155 191)">
                <g transform="translate(218 17)">
                  <path d="m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z" />
                  <path d="m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z" />
                  <path d="m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z" />
                </g>
              </g>
            </g>
          </g>
        </svg>
        {/* {t('aside filter.all categories')} */}
        <div>Tất cả danh mục</div>
      </Link>
      <div className="my-4 h-[1px] bg-gray-300" />
      <ul>
        {categories.map((categoryItem) => {
          const isActive = categoryId === categoryItem.id;
          return (
            <li className="py-2 pl-2" key={categoryItem.id}>
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    categoryId: categoryItem.id,
                  }).toString(),
                }}
                className={classNames("relative px-2", {
                  "font-semibold text-purple-400": isActive,
                })}
              >
                {isActive && (
                  <svg
                    viewBox="0 0 4 7"
                    className="absolute top-1 left-[-10px] h-2 w-2 fill-purple-400"
                  >
                    <polygon points="4 3.5 0 0 0 7" />
                  </svg>
                )}
                {categoryItem.name}
              </Link>
            </li>
          );
        })}
      </ul>
      <Link
        to={path.home}
        className="mt-4 flex items-center font-bold uppercase"
      >
        <svg
          enableBackground="new 0 0 15 15"
          viewBox="0 0 15 15"
          x={0}
          y={0}
          className="mr-3 h-4 w-3 fill-current stroke-current"
        >
          <g>
            <polyline
              fill="none"
              points="5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit={10}
            />
          </g>
        </svg>
        {/* {t("aside filter.filter search")} */}
        <div>Bộ lọc tìm kiếm</div>
      </Link>
      <div className="my-4 h-[1px] bg-gray-300" />
      <div className="my-5">
        <div>Khoảng giá</div>
        <form className="mt-2" onSubmit={onSubmit}>
          <div className="flex items-start">
            <Controller
              control={control}
              name="priceMin"
              render={({ field }) => {
                return (
                  <InputNumber
                    type="text"
                    className="grow"
                    placeholder="₫ TỪ"
                    classNameInput="p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm"
                    classNameError="hidden"
                    {...field}
                    onChange={(event) => {
                      field.onChange(event);
                      trigger("priceMax");
                    }}
                  />
                );
              }}
            />
            {/* <InputV2
              control={control}
              name='price_min'
              type='number'
              className='grow'
              placeholder='₫ TỪ'
              classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
              classNameError='hidden'
              onChange={() => {
                trigger('price_max')
              }}
            /> */}

            <div className="mx-2 mt-2 shrink-0">-</div>
            <Controller
              control={control}
              name="priceMax"
              render={({ field }) => {
                return (
                  <InputNumber
                    type="text"
                    className="grow"
                    placeholder="₫ ĐẾN"
                    classNameInput="p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm"
                    classNameError="hidden"
                    {...field}
                    onChange={(event) => {
                      field.onChange(event);
                      trigger("priceMin");
                    }}
                  />
                );
              }}
            />
          </div>
          <div className="mt-1 min-h-[1.25rem] text-center text-sm text-red-600">
            {errors.priceMin?.message}
          </div>
          <Button className="flex w-full items-center justify-center bg-orange p-2 text-sm uppercase text-white hover:bg-orange/80">
            Áp dụng
          </Button>
        </form>
      </div>
        <div className='my-4 h-[1px] bg-gray-300' />
      <div className='text-sm'>Đánh giá</div>
      <RatingStars queryConfig={queryConfig} />
      <div className='my-4 h-[1px] bg-gray-300' />
      <Button
        onClick={handleRemoveAll}
        className='flex w-full items-center justify-center bg-orange p-2 text-sm uppercase text-white hover:bg-orange/80'
      >
        Xóa tất cả
      </Button>
    </div>
  );
}
