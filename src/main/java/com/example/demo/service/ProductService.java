package com.example.demo.service;

import com.example.demo.dto.request.ProductCreationRequest;
import com.example.demo.dto.request.ProductUpdationRequest;
import com.example.demo.dto.response.PageResponse;
import com.example.demo.dto.response.ProductResponse;

import java.util.List;

public interface ProductService {
    ProductResponse create(ProductCreationRequest productCreationRequest);
    ProductResponse updateProduct(String productId, ProductUpdationRequest productUpdationRequest);
    List<ProductResponse> getAllProducts(String keyword, String categoryId, int page, int limit);
    ProductResponse getProduct(String productId);
    String deleteProduct(String productId);

    PageResponse<?> getProductsListOrder(int pageNo, int pageSize, String order, String sortBy, String categoryId, String id, Integer rating, Long priceMin, Long priceMax, String name);
}
