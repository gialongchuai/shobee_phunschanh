package com.example.demo.service;

import com.example.demo.dto.request.RoleCreationRequest;
import com.example.demo.dto.response.PageResponse;
import com.example.demo.dto.response.RoleResponse;

public interface RoleService {
    PageResponse<?> getRolesByUserId(String userId);
    RoleResponse createRole(RoleCreationRequest roleCreationRequest);
}
