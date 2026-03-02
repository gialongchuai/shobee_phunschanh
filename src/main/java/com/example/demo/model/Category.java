package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tbl_category")
@Entity(name = "Category")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Category extends AbstractEntity<String> {

    @Column(name = "name")
    String name;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    List<Product> products;
}
