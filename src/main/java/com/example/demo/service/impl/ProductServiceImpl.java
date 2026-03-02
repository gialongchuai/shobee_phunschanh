package com.example.demo.service.impl;

import com.example.demo.constant.UploadFileConstant;
import com.example.demo.dto.request.ProductCreationRequest;
import com.example.demo.dto.request.ProductUpdationRequest;
import com.example.demo.dto.response.ProductResponse;
import com.example.demo.exception.CategoryErrorCode;
import com.example.demo.exception.ProductErrorCode;
import com.example.demo.exception.UploadFileErrorCode;
import com.example.demo.exception.custom.AppException;
import com.example.demo.mapper.custom.ProductMapper;
import com.example.demo.model.Category;
import com.example.demo.model.Product;
import com.example.demo.model.ProductImage;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.service.ProductService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ProductServiceImpl implements ProductService {
    ProductRepository productRepository;
    ProductMapper productMapper;
    CategoryRepository categoryRepository;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public ProductResponse create(ProductCreationRequest productCreationRequest) {
        Category category = categoryRepository
                .findById(productCreationRequest.getCategoryId())
                .orElseThrow(() -> new AppException(CategoryErrorCode.CATEGORY_NOT_EXISTED));

        List<String> imageUrls = new ArrayList<>();
        String thumbnailUrl = saveImage(productCreationRequest.getThumbnail());
        if (productCreationRequest.getImages() != null
                && !productCreationRequest.getImages().isEmpty()) {
            for (MultipartFile image : productCreationRequest.getImages()) {
                String imageUrl = saveImage(image);
                imageUrls.add(imageUrl);
            }
        } else {
            throw new AppException(UploadFileErrorCode.EMPTY_FILE);
        }

        var product = productMapper.toProduct(productCreationRequest);
        product.setCategory(category);
        product.setThumbnail(thumbnailUrl);

        List<ProductImage> productImages = new ArrayList<>();
        for (String imageUrl : imageUrls) {
            ProductImage productImage =
                    ProductImage.builder().product(product).imageUrl(imageUrl).build();
            productImages.add(productImage);
        }
        product.setImages(productImages);
        return productMapper.toProductResponse(productRepository.save(product));
    }

    private String saveImage(MultipartFile file) {
        String uniqueFileName = null;
        try {
            if (file == null || file.isEmpty()) {
                throw new AppException(UploadFileErrorCode.EMPTY_FILE);
            }

            if (file.getSize() > UploadFileConstant.MAX_FILE_SIZE) {
                throw new AppException(UploadFileErrorCode.FILE_TOO_LARGE);
            }

            if (!isAllowedImageType(file.getContentType())) {
                throw new AppException(UploadFileErrorCode.INVALID_FILE_FORMAT);
            }

            // Create folder is not exist
            File uploadDir = new File(UploadFileConstant.UPLOAD_DIR);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            // Change name file
            uniqueFileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Path path = Paths.get(UploadFileConstant.UPLOAD_DIR + uniqueFileName);

            Files.copy(file.getInputStream(), path);
        } catch (IOException e) {
            throw new AppException(ProductErrorCode.IMAGE_OR_THUMBNAIL_INVALID);
        }
        return uniqueFileName;
    }

    private boolean isAllowedImageType(String contentType) {
        for (String type : UploadFileConstant.ALLOWED_IMAGE_TYPES) {
            if (type.equalsIgnoreCase(contentType)) {
                return true;
            }
        }
        return false;
    }

    // chat
    @Override
    @Transactional(rollbackFor = Exception.class)
    public ProductResponse updateProduct(String productId, ProductUpdationRequest productUpdationRequest) {
        Category category = categoryRepository
                .findById(productUpdationRequest.getCategoryId())
                .orElseThrow(() -> new AppException(CategoryErrorCode.CATEGORY_NOT_EXISTED));

        Product product = productRepository
                .findById(productId)
                .orElseThrow(() -> new AppException(ProductErrorCode.PRODUCT_NOT_EXISTED));

        // Map tất cả các trường trừ thumbnail và images
        productMapper.updateProduct(product, productUpdationRequest);

        // Xử lý thumbnail
        if (productUpdationRequest.getThumbnail() != null
                && !productUpdationRequest.getThumbnail().isEmpty()) {
            String thumbnailUrl = saveImage(productUpdationRequest.getThumbnail());
            product.setThumbnail(thumbnailUrl);
        }

        // Xử lý images
        List<ProductImage> existingImages = product.getImages(); // Lấy danh sách ảnh hiện có
        if (productUpdationRequest.getImages() != null
                && !productUpdationRequest.getImages().isEmpty()) {
            for (MultipartFile image : productUpdationRequest.getImages()) {
                String imageUrl = saveImage(image); // Lưu ảnh mới
                ProductImage productImage = ProductImage.builder()
                        .product(product)
                        .imageUrl(imageUrl)
                        .build();
                existingImages.add(productImage); // Thêm ảnh mới vào danh sách hiện có
            }
        }

        // Cập nhật danh sách ảnh cho sản phẩm
        product.setImages(existingImages);
        product.setCategory(category);
        // Lưu sản phẩm đã cập nhật
        return productMapper.toProductResponse(productRepository.save(product));
    }

    @Override
    public List<ProductResponse> getAllProducts(String keyword, String categoryId, int page, int limit) {
        // Tạo Pageable từ page và limit
        Pageable pageable = PageRequest.of(page, limit);

        // Gọi phương thức searchProducts từ repository
        Page<Product> productPage = productRepository.searchProducts(categoryId, keyword, pageable);

        List<Product> products = productPage.getContent();

        int totalPages = productPage.getTotalPages();
        System.out.printf(totalPages + " :totalPage!");
        // Chuyển đổi Page<Product> sang Page<ProductResponse>
        return productPage.stream().map(productMapper::toProductResponse).toList();
    }

    @Override
    public ProductResponse getProduct(String productId) {
        return productMapper.toProductResponse(productRepository
                .findById(productId)
                .orElseThrow(() -> new AppException(ProductErrorCode.PRODUCT_NOT_EXISTED)));
    }

    @Override
    public String deleteProduct(String productId) {
        productRepository.deleteById(productId);
        return "Delete product successfully!";
    }
}
