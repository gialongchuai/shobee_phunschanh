package com.example.demo.dto.response;

import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserHasRoleResponse extends AbstractEntityResponse<String> {
    private RoleResponse roleResponse;
    private UserResponse userResponse;
}
