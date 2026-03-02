package com.example.demo.repository;

import com.example.demo.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {
    @Query("SELECT p FROM Product p WHERE " +
            "(:catId IS NULL OR :catId = '0' OR p.category.id = :catId) " +
            "AND (:kw IS NULL OR :kw = '' OR p.name LIKE CONCAT('%', :kw, '%') OR p.description LIKE CONCAT('%', :kw, '%'))")
    Page<Product> searchProducts(
            @Param("catId") String categoryId,
            @Param("kw") String keyword,
            Pageable pageable);
}
