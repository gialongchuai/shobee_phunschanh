package com.example.demo.dto.request;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class ResetPasswordRequest {
    private String secretKey;

    private String newPassword;

    private String confirmNewPassword;
}
