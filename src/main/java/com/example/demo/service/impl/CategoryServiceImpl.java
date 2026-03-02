package com.example.demo.service.impl;

import com.example.demo.dto.request.CategoryCreationRequest;
import com.example.demo.dto.request.CategoryUpdationRequest;
import com.example.demo.dto.response.CategoryResponse;
import com.example.demo.exception.CategoryErrorCode;
import com.example.demo.exception.custom.AppException;
import com.example.demo.mapper.custom.CategoryMapper;
import com.example.demo.model.Category;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.service.CategoryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CategoryServiceImpl implements CategoryService {
    CategoryRepository categoryRepository;
    CategoryMapper categoryMapper;

    @Override
    public CategoryResponse create(CategoryCreationRequest categoryCreationRequest) {
        return categoryMapper.toCategoryResponse(
                categoryRepository.save(categoryMapper.toCategory(categoryCreationRequest)));
    }

    @Override
    public List<CategoryResponse> getAllCategories() {
        var categories = categoryRepository.findAll();
        return categories.stream().map(categoryMapper::toCategoryResponse).toList();
    }

    @Override
    public CategoryResponse getCategory(String categoryId) {
        return categoryMapper.toCategoryResponse(categoryRepository
                .findById(categoryId)
                .orElseThrow(() -> new AppException(CategoryErrorCode.CATEGORY_NOT_EXISTED)));
    }

    @Override
    public CategoryResponse updateCategory(String categoryId, CategoryUpdationRequest categoryUpdationRequest) {
        Category category = categoryRepository
                .findById(categoryId)
                .orElseThrow(() -> new AppException(CategoryErrorCode.CATEGORY_NOT_EXISTED));

        categoryMapper.updateCategory(category, categoryUpdationRequest);

        return categoryMapper.toCategoryResponse(categoryRepository.save(category));
    }

    @Override
    public String deleteCategory(String categoryId) {
        categoryRepository.deleteById(categoryId);
        return "Delete category successfully!";
    }
}
