import type { ApiResponse } from "../types/api"
import type { Category } from "../types/category"
import http from "../utils/http"

const URL = '/category/'

const categoryApi = {
  getCategories() {
    return http.get<ApiResponse<Category[]>>(URL)
  }
}

export default categoryApi