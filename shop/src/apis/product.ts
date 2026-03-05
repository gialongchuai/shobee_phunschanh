import type { ApiResponse } from "../types/api";
import type { PaginatedProductsResponse, ProductRequest } from "../types/product";
import http from "../utils/http";

export const productApi = {
    getProducts: (params: ProductRequest) =>
        http.get<ApiResponse<PaginatedProductsResponse>>("/product/list-with-order", { params }),
};