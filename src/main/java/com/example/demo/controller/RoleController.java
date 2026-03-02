package com.example.demo.controller;

import com.example.demo.configuration.Translator;
import com.example.demo.dto.request.RoleCreationRequest;
import com.example.demo.dto.response.ApiResponse;
import com.example.demo.dto.response.PageResponse;
import com.example.demo.dto.response.RoleResponse;
import com.example.demo.service.RoleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/role")
@Tag(name = "Role Controller")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
@Slf4j
@Validated
public class RoleController {
    RoleService roleService;

    @Operation(summary = "Get all roles of a user by userId", description = "API get all roles of a user by userId!")
    @GetMapping("/{userId}")
    public ApiResponse<PageResponse> getRolesByUserId(@PathVariable String  userId) {
        log.info("Chuẩn bị trà trộn get all roles của userId: {}", userId);
        return new ApiResponse<>(HttpStatus.OK.value(), Translator.toLocale("role.get.success"), roleService.getRolesByUserId(userId));

//        try {
//            return new ResponseData<>(HttpStatus.OK.value(), Translator.toLocale("role.get.success"), roleService.getRolesByUserId(userId));
//        } catch (Exception e) {
//            log.error("Error get roles: {} {}", e.getMessage(), e.getCause());
//            return new ResponseError(HttpStatus.BAD_REQUEST.value(), Translator.toLocale("role.get.fail"));
//        }
    }

    @PostMapping("/")
    @Operation(summary = "Create role", description = "Creates a new role")
    ApiResponse<RoleResponse> createRole(@RequestBody RoleCreationRequest request) {
        return ApiResponse.<RoleResponse>builder()
                .result(roleService.createRole(request))
                .build();
    }
}
