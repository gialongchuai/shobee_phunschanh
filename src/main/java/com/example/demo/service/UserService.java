package com.example.demo.service;

import com.example.demo.dto.request.UserCreationRequest;
import com.example.demo.dto.response.PageResponse;
import com.example.demo.dto.response.UserResponse;
import com.example.demo.util.UserStatus;
import org.springframework.data.domain.Pageable;

public interface UserService {

    UserResponse saveUser(UserCreationRequest requestDTO);
    void updateUser(String userId, UserCreationRequest requestDTO);
    void changeStatusUser(String userId, UserStatus userStatus);
    void deleteUser(String userId);
    UserResponse getUser(String userId);
    PageResponse<?> getAllUsers(int pageNo, int pageSize, String sortBy);
    PageResponse<?> getAllUsersOrderWithMultipleColumns(int pageNo, int pageSize, String... sorts);
    PageResponse<?> getUserListOrderWithOneColumnAndSearch(int pageNo, int pageSize, String search, String sortBy);
    PageResponse<?> advanceSearchByCriteria(int pageNo, int pageSize, String sortBy, String street, String... search);
    PageResponse<?> advanceSearchWithSpecification(Pageable pageable, String[] user, String[] address);
    PageResponse<?> testingApiFilterUserAndAddress(String lastName, String street);
}
