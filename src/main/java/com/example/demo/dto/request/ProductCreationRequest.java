package com.example.demo.dto.request;

import jakarta.persistence.Column;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Setter
@Getter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductCreationRequest {
    @NotBlank(message = "PRODUCT_IS_REQUIRED")
    String name;

    @NotNull(message = "PRICE_IS_REQUIRED")
    @DecimalMin(value = "0.0", inclusive = true, message = "PRICE_INVALID")
    BigDecimal price;
    String description;

    @NotNull(message = "THUMBNAIL_IS_REQUIRED")
    MultipartFile thumbnail;

    @NotNull(message = "IMAGE_IS_REQUIRED")
    List<MultipartFile> images;

    @NotBlank(message = "CATEGORY_IS_REQUIRED")
    String categoryId;
    // CategoryCreationRequest categoryCreationRequest;
    // List<OrderDetail> orderDetails;

    // =================== Bổ sung ====================
    BigDecimal priceBeforeDiscount; // ⭐ MỚI

    Long quantity; // ⭐ MỚI

    Long sold; // ⭐ MỚI

    Long view; // ⭐ MỚI

    Double rating; // ⭐ MỚI
}
