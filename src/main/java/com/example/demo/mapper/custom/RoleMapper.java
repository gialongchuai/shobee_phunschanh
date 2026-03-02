package com.example.demo.mapper.custom;

import com.example.demo.dto.request.RoleCreationRequest;
import com.example.demo.dto.response.RoleResponse;
import com.example.demo.model.Role;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RoleMapper {
    Role toRole(RoleCreationRequest roleCreationRequest);

    RoleResponse toRoleResponse(Role role);
}
