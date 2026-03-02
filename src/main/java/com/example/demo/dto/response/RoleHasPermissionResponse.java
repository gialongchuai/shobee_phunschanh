package com.example.demo.dto.response;

import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RoleHasPermissionResponse extends AbstractEntityResponse<String> {

    private RoleResponse roleResponse;

    private PermissionResponse permissionResponse;
}
