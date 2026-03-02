package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "tbl_product")
@Entity(name = "Product")
public class Product extends AbstractEntity<String> {

    @Column(name = "name")
    String name;

    @Column(name = "price")
    BigDecimal price;

    @Column(name = "thumbnail")
    String thumbnail;

    @Column(name = "description")
    String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    Category category;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    List<ProductImage> images;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    List<OrderDetail> orderDetails;

    // =================== Bổ sung ====================
    @Column(name = "price_before_discount")
    BigDecimal priceBeforeDiscount; // ⭐ MỚI

    @Column(name = "quantity")
    Long quantity; // ⭐ MỚI

    @Column(name = "sold")
    Long sold; // ⭐ MỚI

    @Column(name = "view")
    Long view; // ⭐ MỚI

    @Column(name = "rating")
    Double rating; // ⭐ MỚI
}
