package com.example.demo.dto.response;

import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserHasRoleResponse extends AbstractEntityResponse<Long> {
    private RoleResponse roleResponse;
    private UserResponse userResponse;
}
