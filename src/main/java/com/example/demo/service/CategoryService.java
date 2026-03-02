package com.example.demo.service;

import com.example.demo.dto.request.CategoryCreationRequest;
import com.example.demo.dto.request.CategoryUpdationRequest;
import com.example.demo.dto.response.CategoryResponse;

import java.util.List;

public interface CategoryService {
    CategoryResponse create(CategoryCreationRequest categoryCreationRequest);
    List<CategoryResponse> getAllCategories();
    CategoryResponse getCategory(String categoryId);
    CategoryResponse updateCategory(String categoryId, CategoryUpdationRequest categoryUpdationRequest);
    String deleteCategory(String categoryId);
}
