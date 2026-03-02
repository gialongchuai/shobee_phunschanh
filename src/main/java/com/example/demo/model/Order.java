package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.List;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "tbl_order")
@Entity(name = "Order")
public class Order extends AbstractEntity<String> {

    @Column(name = "fullname")
    String fullname;

    @Column(name = "email")
    String email;

    @Column(name = "phone_number")
    String phoneNumber;

    @Column(name = "address")
    String address;

    @Column(name = "note")
    String note;

    @Column(name = "order_date")
    LocalDate orderDate;

    @Column(name = "status")
    String status;

    @Column(name = "total_money")
    Float totalMoney;

    @Column(name = "shipping_method")
    String shippingMethod;

    @Column(name = "shipping_address")
    String shippingAddress;

    @Column(name = "shipping_date")
    LocalDate shippingDate;

    @Column(name = "tracking_number")
    String trackingNumber;

    @Column(name = "payment_method")
    String paymentMethod;

    @Column(name = "active")
    Boolean active;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    User user;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    List<OrderDetail> orderDetails;
}
