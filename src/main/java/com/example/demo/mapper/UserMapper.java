package com.example.demo.mapper;

import com.example.demo.dto.request.UserRequestDTO;
import com.example.demo.dto.response.RoleResponse;
import com.example.demo.dto.response.UserHasRoleResponse;
import com.example.demo.dto.response.UserResponse;
import com.example.demo.model.User;

public class UserMapper {
    public static UserResponse toUserResponse(User user) {
        UserResponse userResponse = UserResponse.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .dateOfBirth(user.getDateOfBirth())
                .gender(user.getGender())
                .phone(user.getPhone())
                .email(user.getEmail())
                .username(user.getUsername())
                .status(user.getStatus())
                .type(user.getType())
                .build();

        userResponse.setId(user.getId());
        userResponse.setCreatedAt(user.getCreatedAt());
        userResponse.setUpdatedAt(user.getUpdatedAt());
        return userResponse;
    }

    public static User toUser(UserRequestDTO userRequestDTO) {
        User user = User.builder()
                .firstName(userRequestDTO.getFirstName())
                .lastName(userRequestDTO.getLastName())
                .dateOfBirth(userRequestDTO.getDateOfBirth())
                .gender(userRequestDTO.getGender())
                .phone(userRequestDTO.getPhone())
                .email(userRequestDTO.getEmail())
                .username(userRequestDTO.getUsername())
                .status(userRequestDTO.getStatus())
                .type(userRequestDTO.getType())
                .build();

        return user;
    }

    public static UserHasRoleResponse toUserHasRoleResponse(UserResponse userResponsem, RoleResponse roleResponse) {
        UserHasRoleResponse userHasRoleResponse = UserHasRoleResponse.builder()
                .roleResponse(RoleResponse.builder()
                        .name(roleResponse.getName())
                        .build())
                .build();

        return userHasRoleResponse;
    }

    public static void updateUser(User user, UserRequestDTO userRequestDTO) {
        user.setFirstName(userRequestDTO.getFirstName());
        user.setLastName(userRequestDTO.getLastName());
        user.setDateOfBirth(userRequestDTO.getDateOfBirth());
        user.setGender(userRequestDTO.getGender());
        user.setPhone(userRequestDTO.getPhone());
        user.setEmail(userRequestDTO.getEmail());
        user.setUsername(userRequestDTO.getUsername());
        user.setStatus(userRequestDTO.getStatus());
        user.setType(userRequestDTO.getType());
    }
}
