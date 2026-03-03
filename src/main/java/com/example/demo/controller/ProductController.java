package com.example.demo.controller;

import com.example.demo.configuration.Translator;
import com.example.demo.dto.request.ProductCreationRequest;
import com.example.demo.dto.request.ProductUpdationRequest;
import com.example.demo.dto.response.ApiResponse;
import com.example.demo.dto.response.PageResponse;
import com.example.demo.dto.response.ProductResponse;
import com.example.demo.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@RequestMapping("/product")
@Tag(name = "Product", description = "Product management APIs")
public class ProductController {
    ProductService productService;

    @PostMapping("/")
    @Operation(summary = "Create product", description = "Creates a new product")
    ApiResponse<ProductResponse> create(@ModelAttribute @Valid ProductCreationRequest productCreationRequest) {
        log.info("Chuẩn bị trà trộn create product với request: {}", productCreationRequest);
        return ApiResponse.<ProductResponse>builder()
                .result(productService.create(productCreationRequest))
                .build();
    }

    @GetMapping("/list")
    @Operation(summary = "Get all products", description = "Retrieves all products with optional filters")
    ApiResponse<List<ProductResponse>> getAllProducts(
            @RequestParam(required = false) String categoryId,
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int limit
    ) {
        List<ProductResponse> productPage = productService.getAllProducts(keyword, categoryId, page, limit);

        return ApiResponse.<List<ProductResponse>>builder()
                .result(productPage)
                .build();
    }

    @GetMapping("/{productId}")
    @Operation(summary = "Get product by ID", description = "Retrieves a specific product by ID")
    ApiResponse<ProductResponse> getProduct(@PathVariable String productId) {
        return ApiResponse.<ProductResponse>builder()
                .result(productService.getProduct(productId))
                .build();
    }

    @PutMapping("/{productId}")
    @Operation(summary = "Update product", description = "Updates an existing product")
    ApiResponse<ProductResponse> updateProduct(
            @PathVariable String productId, @ModelAttribute @Valid ProductUpdationRequest productUpdationRequest)
            throws IOException {
        return ApiResponse.<ProductResponse>builder()
                .result(productService.updateProduct(productId, productUpdationRequest))
                .build();
    }

    @DeleteMapping("/{productId}")
    @Operation(summary = "Delete product", description = "Deletes a product by ID")
    ApiResponse<String> delete(@PathVariable String productId) {
        return ApiResponse.<String>builder()
                .result(productService.deleteProduct(productId))
                .build();
    }

    @Operation(summary = "Get product list with multiple columns", description = "API get product list and order column!")
    @GetMapping("/list-with-order")
    public ApiResponse<PageResponse> getProductsListOrder(
            @RequestParam(defaultValue = "1", required = false) int pageNo,
            @RequestParam(defaultValue = "15", required = false) int pageSize,
            @RequestParam(defaultValue = "desc", required = false) String order,
            @RequestParam(defaultValue = "created_at", required = false) String sortBy,
            @RequestParam(defaultValue = "", required = false) String categoryId,
            @RequestParam(defaultValue = "", required = false) String productId,
            @RequestParam(required = false) Integer rating,
            @RequestParam(required = false) Long priceMin,
            @RequestParam(required = false) Long priceMax,
            @RequestParam(defaultValue = "", required = false) String name
    ) {
        log.info("Dang get products voi so trang: " + pageNo + ", so record: " + pageSize);
        return new ApiResponse<>(HttpStatus.OK.value(), "Get list product successfully!", productService.getProductsListOrder(pageNo, pageSize, order, sortBy, categoryId, productId, rating, priceMin, priceMax, name));
    }
}
