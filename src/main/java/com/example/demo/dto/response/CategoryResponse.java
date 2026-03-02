package com.example.demo.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CategoryResponse {
    String id;
    String name;
}
