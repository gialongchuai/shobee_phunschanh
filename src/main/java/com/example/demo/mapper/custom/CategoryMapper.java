package com.example.demo.mapper.custom;

import com.example.demo.dto.request.CategoryCreationRequest;
import com.example.demo.dto.request.CategoryUpdationRequest;
import com.example.demo.dto.response.CategoryResponse;
import com.example.demo.model.Category;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    Category toCategory(CategoryCreationRequest categoryCreationRequest);

    CategoryResponse toCategoryResponse(Category category);

    void updateCategory(@MappingTarget Category category, CategoryUpdationRequest categoryUpdationRequest);
}
