export interface ProductResponse {
    id: string;
    name: string;
    price: number;
    thumbnail: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    images: {
        id: string;
        imageUrl: string;
    }[];
    categoryResponse: {
        id: string;
        name: string;
    };
    priceBeforeDiscount: number;
    quantity: number;
    sold: number;
    view: number;
    rating: number;
}

export interface PaginatedProductsResponse {
    items: ProductResponse[];
    pageNo: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
}

// == ProdcutRequest ==
export interface ProductRequest {
    pageNo?: number; // mặc định 1
    pageSize?: number; // mặc định 15
    order?: "asc" | "desc"; // mặc định desc
    sortBy?: string; // created_at, price, name, ...
    categoryId?: string; // lấy trong filter của category
    productId?: string; // loại bỏ productId này
    rating?: number; // từ rating này trở lên
    priceMin?: number; // từ priceMin này trở lên
    priceMax?: number; // từ priceMax này trở xuống
    name?: string; // tìm kiếm theo tên (có thể dùng để search)
}