package com.example.demo.mapper;

import com.example.demo.dto.response.RoleResponse;
import com.example.demo.model.Role;

public class RoleMapper {
    public static RoleResponse toRoleResponse(Role role) {
        RoleResponse roleResponse = RoleResponse.builder()
                .name(role.getName())
                .build();
        roleResponse.setId(role.getId());
        return roleResponse;
    }
}
