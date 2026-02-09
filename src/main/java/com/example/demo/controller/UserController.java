package com.example.demo.controller;

import com.example.demo.configuration.Translator;
import com.example.demo.dto.request.UserRequestDTO;
import com.example.demo.dto.response.ApiResponse;
import com.example.demo.dto.response.PageResponse;
import com.example.demo.dto.response.UserResponse;
import com.example.demo.exception.custom.ResourceNotFoundException;
import com.example.demo.service.UserService;
import com.example.demo.util.UserStatus;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@Tag(name = "User Controller")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
@Slf4j
@Validated // Phải để ở ngoài nó mới show ra log lỗi cho requestParam min(10)
public class UserController {
    UserService userService;

    @Operation(summary = "Add user", description = "API create a user!")
    @PostMapping("/")
    public ApiResponse<Long> addUser(@Valid @RequestBody UserRequestDTO requestDTO) {
        log.info("Dang them 1 user: " + requestDTO);
        return new ApiResponse<>(HttpStatus.CREATED.value(), Translator.toLocale("user.add.success"), userService.saveUser(requestDTO));

//        try {
//            return new ResponseData<>(HttpStatus.CREATED.value()
//                    , Translator.toLocale("user.add.success")
//                    , userService.saveUser(requestDTO));
//        } catch (Exception e) {
//            log.error("Error add user: {} {}", e.getMessage(), e.getCause());
//            return new ResponseError(HttpStatus.BAD_REQUEST.value(), Translator.toLocale("user.add.fail"));
//        }
    }

    @Operation(summary = "Update user", description = "API update a user!")
    @PutMapping("/{userId}")
    public ApiResponse<?> updateUser(@PathVariable Long userId, @RequestBody UserRequestDTO requestDTO) {
        log.info("Dang update userID: " + userId);
        userService.updateUser(userId, requestDTO);
        return new ApiResponse<>(HttpStatus.ACCEPTED.value(), Translator.toLocale("user.update.success"), null);


//        try {
//            userService.updateUser(userId, requestDTO);
//            return new ResponseData<>(HttpStatus.ACCEPTED.value(), Translator.toLocale("user.update.success"));
//        } catch (
//                ResourceNotFoundException e) { // Cái post nếu lỗi thì quăng cái Exception còn cái get do bên service có quăng cái resource nên
//            log.error("Error update user: {} {}", e.getMessage(), e.getCause()); // bên này bắt đúng cái lỗi đó luôn !!!
//            return new ResponseError(HttpStatus.BAD_REQUEST.value(), e.getMessage()); // đối với lỗi do resource thì quăng lỗi i18n luôn.
//        }
    }

    @Operation(summary = "Update status user", description = "API update status a user!")
    @PatchMapping("/{userId}")
    public ApiResponse<?> changeUserStatus(@PathVariable Long userId, @RequestParam UserStatus status) {
        log.info("Dang change status cho user: " + userId);
        userService.changeStatusUser(userId, status);
        return new ApiResponse<>(HttpStatus.ACCEPTED.value(), Translator.toLocale("user.update.success"), null);

//        try {
//            userService.changeStatusUser(userId, status);
//            return new ResponseData<>(HttpStatus.ACCEPTED.value(), Translator.toLocale("user.update.success"));
//        } catch (ResourceNotFoundException e) {
//            log.error("Error change status user: {} {}", e.getMessage(), e.getCause());
//            return new ResponseError(HttpStatus.BAD_REQUEST.value(), e.getMessage());
//        }
    }

    @Operation(summary = "Delete a user", description = "API delete a user!")
    @DeleteMapping("/{userId}")
    public ApiResponse<?> deleteUser(@PathVariable Long userId) {
        log.info("Dang xoa user: " + userId);
        userService.deleteUser(userId);
        return new ApiResponse<>(HttpStatus.NO_CONTENT.value(), Translator.toLocale("user.delete.success"), null);

//        try {
//            userService.deleteUser(userId);
//            return new ResponseData<>(HttpStatus.NO_CONTENT.value(), Translator.toLocale("user.delete.success"));
//        } catch (Exception e) {
//            log.error("Error delete user: {} {}", e.getMessage(), e.getCause());
//            return new ResponseError(HttpStatus.BAD_REQUEST.value(), Translator.toLocale("user.delete.fail"));
//        }
    }

    @Operation(summary = "Get information a user", description = "API get a user!")
    @GetMapping("/{userId}")
//    @PreAuthorize("hasAuthority('admin')")
    public ApiResponse<UserResponse> getUser(@PathVariable @Min(1) @Valid Long userId) { // new UserRequestDTO("Tay", "Java", "abc@gmail.com", "0321123123")
        log.info("Dang get user: " + userId);
        return new ApiResponse<>(HttpStatus.OK.value(), Translator.toLocale("user.get.success"), userService.getUser(userId));

//        try {
//            return new ResponseData(HttpStatus.OK.value(), Translator.toLocale("user.get.success"), userService.getUser(userId));
//        } catch (ResourceNotFoundException e) {
//            log.error("Error get user: {} {}", e.getMessage(), e.getCause());
//            return new ResponseError(HttpStatus.BAD_REQUEST.value(), e.getMessage());
//        }
    }

    @Operation(summary = "Get information a user list", description = "API get list user!")
    @GetMapping("/list")
//    @PreAuthorize("hasAnyAuthority('admin', 'manager')")
    public ApiResponse<PageResponse> getUserList(@RequestParam(defaultValue = "0", required = false) int pageNo
            , @Min(5) @RequestParam(defaultValue = "20", required = false) int pageSize
            , @RequestParam(required = false) String sortBy) { // sort nhiều column này là dùng Pageable
        log.info("Dang get users voi so trang: " + pageNo + ", so record: " + pageSize);
        return new ApiResponse<>(HttpStatus.OK.value(), Translator.toLocale("user.get.success"), userService.getAllUsers(pageNo, pageSize, sortBy));

//        try {
//            return new ResponseData<>(HttpStatus.OK.value(), Translator.toLocale("user.get.success"), userService.getAllUsers(pageNo, pageSize, sortBy));
//        } catch (Exception e) {
//            log.error("Error get users: {} {}", e.getMessage(), e.getCause());
//            return new ResponseError(HttpStatus.BAD_REQUEST.value(), Translator.toLocale("user.get.fail"));
//        }
    }

    @Operation(summary = "Get information a user list with multiple columns", description = "API get list user and order list with multiple columns!")
    @GetMapping("/list-order-with-multiple-columns")
    public ApiResponse<PageResponse> getUserListOrderWithMultipleColumns(@RequestParam(defaultValue = "0", required = false) int pageNo
            , @Min(5) @RequestParam(defaultValue = "20", required = false) int pageSize
            , @RequestParam(required = false) String... sortBy) { // sort nhiều column này là dùng Pageable
        log.info("Dang get users voi so trang: " + pageNo + ", so record: " + pageSize);
        return new ApiResponse<>(HttpStatus.OK.value(), Translator.toLocale("user.get.success"), userService.getAllUsersOrderWithMultipleColumns(pageNo, pageSize, sortBy));

//        try {
//            return new ResponseData<>(HttpStatus.OK.value(), Translator.toLocale("user.get.success"), userService.getAllUsersOrderWithMultipleColumns(pageNo, pageSize, sortBy));
//        } catch (Exception e) {
//            log.error("Error get users: {} {}", e.getMessage(), e.getCause());
//            return new ResponseError(HttpStatus.BAD_REQUEST.value(), Translator.toLocale("user.get.fail"));
//        }
    }

    @Operation(summary = "Get information a user list with order one column and search", description = "API get list user and order list with one column and search!")
    @GetMapping("/list-order-with-one-columns-and-search")
    public ApiResponse<PageResponse> getUserListOrderWithOneColumnAndSearch(@RequestParam(defaultValue = "0", required = false) int pageNo
            , @Min(5) @RequestParam(defaultValue = "20", required = false) int pageSize
            , @RequestParam(required = false) String search
            , @RequestParam(required = false) String sortBy) { // sort ít này không dùng pageable được phải append vào order by của câu query
        log.info("Dang get users voi so trang: " + pageNo + ", so record: " + pageSize);
        return new ApiResponse<>(HttpStatus.OK.value(), Translator.toLocale("user.get.success"), userService.getUserListOrderWithOneColumnAndSearch(pageNo, pageSize, search, sortBy));

//        try {
//            return new ResponseData<>(HttpStatus.OK.value(), Translator.toLocale("user.get.success"), userService.getUserListOrderWithOneColumnAndSearch(pageNo, pageSize, search, sortBy));
//        } catch (Exception e) {
//            log.error("Error get users: {} {}", e.getMessage(), e.getCause());
//            return new ResponseError(HttpStatus.BAD_REQUEST.value(), Translator.toLocale("user.get.fail"));
//        }
    }

    // Cách làm map với full field object không dùng các String firstName, lastName, ... vào params rồi viết query tốn time !!!
    @Operation(summary = "Get information a user list order with one column and search with criteria", description = "API get list user and order list with one column and search with criteria!")
    @GetMapping("/list-advance-search-with-criteria")
    public ApiResponse<PageResponse> advanceSearchByCriteria(@RequestParam(defaultValue = "0", required = false) int pageNo
            , @Min(5) @RequestParam(defaultValue = "20", required = false) int pageSize
            , @RequestParam(required = false) String sortBy // sort 1 cột thôi // tên đường ví dụ Tran thì query tới Address kiếm street like "%Tran%"
            , @RequestParam(required = false) String street  // : code hiện tại search full field User nhưng chỉ dược 1 field của Address
            , @RequestParam(required = false) String... search) { // email:email, id>8 , ...   //
        log.info("Dang get users voi so trang: " + pageNo + ", so record: " + pageSize);
        return new ApiResponse<>(HttpStatus.OK.value(), Translator.toLocale("user.get.success"), userService.advanceSearchByCriteria(pageNo, pageSize, sortBy, street, search));

//        try {
//            return new ResponseData<>(HttpStatus.OK.value(), Translator.toLocale("user.get.success"), userService.advanceSearchByCriteria(pageNo, pageSize, sortBy, street, search));
//        } catch (Exception e) {
//            log.error("Error get users: {} {}", e.getMessage(), e.getCause());
//            return new ResponseError(HttpStatus.BAD_REQUEST.value(), Translator.toLocale("ux`x`x`ser.get.fail"));
//        }
    }

    @Operation(summary = "Advance search to get User list with specification", description = "API get list user with advance search specification!")
    @GetMapping("/list-advance-search-with-specification")
    public ApiResponse<PageResponse> advanceSearchWithSpecification(Pageable pageable
            , @RequestParam(required = false) String[] user
            , @RequestParam(required = false) String[] address) {
        log.info("Advance search to get User list with specification ...");
        return new ApiResponse<>(HttpStatus.OK.value(), Translator.toLocale("user.get.success"), userService.advanceSearchWithSpecification(pageable, user, address));

//        try {
//            return new ResponseData<>(HttpStatus.OK.value(), Translator.toLocale("user.get.success"), userService.advanceSearchWithSpecification(pageable, user, address));
//        } catch (Exception e) {
//            log.error("Error get users: {} {}", e.getMessage(), e.getCause());
//            return new ResponseError(HttpStatus.BAD_REQUEST.value(), Translator.toLocale("ux`x`x`ser.get.fail"));
//        }
    }

    @Operation(summary = "Advance search to get User list with specification", description = "API get list user with advance search specification!")
    @GetMapping("/testing-filter-filed-user-address")
    public ApiResponse<PageResponse> testingApiFilterUserAndAddress(
            @RequestParam(required = false) String lastName,
            @RequestParam(required = false) String street
    ) {
        log.info("Advance search to get User list with specification ...");
        return new ApiResponse<>(HttpStatus.OK.value(), Translator.toLocale("user.get.success"), userService.testingApiFilterUserAndAddress(lastName, street));

//        try {
//            return new ResponseData<>(HttpStatus.OK.value(), Translator.toLocale("user.get.success"), userService.testingApiFilterUserAndAddress(lastName, street));
//        } catch (Exception e) {
//            log.error("Error get users: {} {}", e.getMessage(), e.getCause());
//            return new ResponseError(HttpStatus.BAD_REQUEST.value(), Translator.toLocale("ux`x`x`ser.get.fail"));
//        }
    }
}
