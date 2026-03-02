package com.example.demo.mapper.custom;

import com.example.demo.dto.request.ProductCreationRequest;
import com.example.demo.dto.request.ProductUpdationRequest;
import com.example.demo.dto.response.ProductResponse;
import com.example.demo.model.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    @Mapping(target = "thumbnail", ignore = true)
    @Mapping(target = "images", ignore = true)
    Product toProduct(ProductCreationRequest productCreationRequest);

    @Named("toProductResponse")
    @Mapping(target = "categoryResponse", source = "category")
    ProductResponse toProductResponse(Product product);

    @Mapping(target = "thumbnail", ignore = true)
    @Mapping(target = "images", ignore = true)
    void updateProduct(@MappingTarget Product product, ProductUpdationRequest productUpdationRequest);
}
