package com.example.demo.repository;

import com.example.demo.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {
    @Query("SELECT p FROM Product p WHERE " +
            "(:catId IS NULL OR :catId = '0' OR p.category.id = :catId) " +
            "AND (:kw IS NULL OR :kw = '' OR p.name LIKE CONCAT('%', :kw, '%') OR p.description LIKE CONCAT('%', :kw, '%'))")
    Page<Product> searchProducts(
            @Param("catId") String categoryId,
            @Param("kw") String keyword,
            Pageable pageable);

//    @Query(nativeQuery = true, value = "select *\n" +)
//            "    from tbl_product\n" +
//            "    where (:categoryId IS NULL OR :categoryId = '0' OR category_id like :categoryId)\n" +
//            "    and (:id IS NULL OR id not like :id)\n" +
//            "    and (:rating IS NULL OR rating >= :rating)\n" +
//            "    and (:priceMin IS NULL OR price >= :priceMin) and (:priceMax IS NULL OR price <= :priceMax)\n" +
//            "    and (:name IS NULL OR name like CONCAT('%', :name, '%') or description like CONCAT('%', :name, '%'))")

    @Query(nativeQuery = true, value =
            "SELECT * FROM tbl_product " +
                    "WHERE (:categoryId IS NULL OR :categoryId = '' OR category_id = :categoryId) " +
                    "AND (:productId IS NULL OR :productId = '' OR id != :productId) " +
                    "AND (:rating IS NULL OR rating >= :rating) " +
                    "AND (:priceMin IS NULL OR price >= :priceMin) " +
                    "AND (:priceMax IS NULL OR price <= :priceMax) " +
                    "AND (:name IS NULL OR :name = '' OR LOWER(name) LIKE CONCAT('%', :name, '%') OR LOWER(description) LIKE CONCAT('%', :name, '%'))"
    )
    Page<Product> getAllProducts(
            @Param("categoryId") String categoryId,
            @Param("productId") String productId,
            @Param("rating") Integer rating,
            @Param("priceMin") Long priceMin,
            @Param("priceMax") Long priceMax,
            @Param("name") String name,
            Pageable pageable
    );
}
