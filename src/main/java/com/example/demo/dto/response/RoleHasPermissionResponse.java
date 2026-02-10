package com.example.demo.dto.response;

import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RoleHasPermissionResponse extends AbstractEntityResponse<Integer> {

    private RoleResponse roleResponse;

    private PermissionResponse permissionResponse;
}
