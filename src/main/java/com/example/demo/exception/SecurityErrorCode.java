package com.example.demo.exception;

import com.example.demo.exception.custom.BaseErrorCode;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public enum SecurityErrorCode implements BaseErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized error!", HttpStatus.INTERNAL_SERVER_ERROR),
    UNAUTHENTICATED(9001, "Unauthenticated!", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(9002, "You don't have permission!", HttpStatus.FORBIDDEN),
    TOKEN_MISSING(9003, "Token must not be blank!", HttpStatus.UNAUTHORIZED),
    TOKEN_INVALID(9004, "Token is invalid or expired!", HttpStatus.UNAUTHORIZED),
    INVALID_CREDENTIALS(9005, "Invalid username or password!", HttpStatus.UNAUTHORIZED);

    int code;
    String message;
    HttpStatusCode httpStatusCode;
}
