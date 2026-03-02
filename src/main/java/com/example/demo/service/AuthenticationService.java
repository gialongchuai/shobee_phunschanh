package com.example.demo.service;

import com.example.demo.dto.request.EmailForgotPasswordRequest;
import com.example.demo.dto.request.ResetPasswordRequest;
import com.example.demo.dto.request.SignInRequest;
import com.example.demo.dto.request.TokenResetPassword;
import com.example.demo.dto.response.TokenResponse;
import jakarta.servlet.http.HttpServletRequest;

public interface AuthenticationService {

    TokenResponse authenticate(SignInRequest signInRequest);
    TokenResponse refresh(HttpServletRequest request);
    String logout(HttpServletRequest request);

    String forgotPassword(EmailForgotPasswordRequest request);
    String resetPassword(TokenResetPassword tokenResetPassword);
    String changePassword(ResetPasswordRequest requestDTO);
}
