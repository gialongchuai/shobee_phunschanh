package com.example.demo.mapper;

import com.example.demo.dto.request.UserCreationRequest;
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

    public static User toUser(UserCreationRequest userCreationRequestDTO) {
        User user = User.builder()
                .firstName(userCreationRequestDTO.getFirstName())
                .lastName(userCreationRequestDTO.getLastName())
                .dateOfBirth(userCreationRequestDTO.getDateOfBirth())
                .gender(userCreationRequestDTO.getGender())
                .phone(userCreationRequestDTO.getPhone())
                .email(userCreationRequestDTO.getEmail())
                .username(userCreationRequestDTO.getUsername())
                .status(userCreationRequestDTO.getStatus())
                .type(userCreationRequestDTO.getType())
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

    public static void updateUser(User user, UserCreationRequest userCreationRequestDTO) {
        user.setFirstName(userCreationRequestDTO.getFirstName());
        user.setLastName(userCreationRequestDTO.getLastName());
        user.setDateOfBirth(userCreationRequestDTO.getDateOfBirth());
        user.setGender(userCreationRequestDTO.getGender());
        user.setPhone(userCreationRequestDTO.getPhone());
        user.setEmail(userCreationRequestDTO.getEmail());
        user.setUsername(userCreationRequestDTO.getUsername());
        user.setStatus(userCreationRequestDTO.getStatus());
        user.setType(userCreationRequestDTO.getType());
    }
}
