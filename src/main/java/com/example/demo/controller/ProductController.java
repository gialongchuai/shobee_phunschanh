package com.example.demo.controller;

import com.example.demo.dto.request.ProductCreationRequest;
import com.example.demo.dto.request.ProductUpdationRequest;
import com.example.demo.dto.response.ApiResponse;
import com.example.demo.dto.response.ProductResponse;
import com.example.demo.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
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

    @GetMapping
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
}
