package com.example.demo.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Setter
@Getter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductResponse {
    String id;
    String name;
    BigDecimal price;
    String thumbnail;
    String description;
    Date createdAt;
    Date updatedAt;
    List<ProductImageResponse> images;
    CategoryResponse categoryResponse;
    // List<OrderDetail> orderDetails;

    // =================== Bổ sung ====================
    BigDecimal priceBeforeDiscount; // ⭐ MỚI
    Long quantity; // ⭐ MỚI
    Long sold; // ⭐ MỚI
    Long view; // ⭐ MỚI
    Double rating; // ⭐ MỚI
}
