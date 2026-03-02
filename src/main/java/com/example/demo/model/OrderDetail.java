package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "tbl_order_detail")
@Entity(name = "OrderDetail")
public class OrderDetail extends AbstractEntity<String> {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    Product product;

    @Column(name = "price")
    BigDecimal price;

    @Column(name = "number_of_products")
    Long numberOfProducts;

    @Column(name = "total_money")
    BigDecimal totalMoney;

    @Column(name = "color")
    String color;
}
