package com.example.demo.dto.response;

import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PermissionResponse extends AbstractEntityResponse<String> {

    private String name;

    private Set<RoleHasPermissionResponse> roleHasPermissionResponses = new HashSet<>();
}
