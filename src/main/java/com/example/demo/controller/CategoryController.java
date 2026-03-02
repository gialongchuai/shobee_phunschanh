package com.example.demo.controller;

import com.example.demo.dto.request.CategoryCreationRequest;
import com.example.demo.dto.request.CategoryUpdationRequest;
import com.example.demo.dto.response.ApiResponse;
import com.example.demo.dto.response.CategoryResponse;
import com.example.demo.service.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/category")
@Tag(name = "Category", description = "Category management APIs")
@Slf4j
public class CategoryController {
    CategoryService categoryService;

    @PostMapping("/")
    @Operation(summary = "Create category", description = "Creates a new category")
    ApiResponse<CategoryResponse> create(@RequestBody CategoryCreationRequest categoryCreationRequest) {
        log.info("Creating category with name: {}", categoryCreationRequest.getName());
        return ApiResponse.<CategoryResponse>builder()
                .result(categoryService.create(categoryCreationRequest))
                .build();
    }

    @GetMapping("/")
    @Operation(summary = "Get all categories", description = "Retrieves all categories")
    ApiResponse<List<CategoryResponse>> getAllCategory() {
        return ApiResponse.<List<CategoryResponse>>builder()
                .result(categoryService.getAllCategories())
                .build();
    }

    @GetMapping("/{categoryId}")
    @Operation(summary = "Get category by ID", description = "Retrieves a specific category by ID")
    ApiResponse<CategoryResponse> getCategory(@PathVariable String categoryId) {
        return ApiResponse.<CategoryResponse>builder()
                .result(categoryService.getCategory(categoryId))
                .build();
    }

    @PutMapping("/{categoryId}")
    @Operation(summary = "Update category", description = "Updates an existing category")
    ApiResponse<CategoryResponse> updateCategory(
            @PathVariable String categoryId, @RequestBody @Valid CategoryUpdationRequest categoryUpdationRequest) {
        return ApiResponse.<CategoryResponse>builder()
                .result(categoryService.updateCategory(categoryId, categoryUpdationRequest))
                .build();
    }

    @DeleteMapping("/{categoryId}")
    @Operation(summary = "Delete category", description = "Deletes a category by ID")
    ApiResponse<String> delete(@PathVariable String categoryId) {
        return ApiResponse.<String>builder()
                .result(categoryService.deleteCategory(categoryId))
                .build();
    }
}
