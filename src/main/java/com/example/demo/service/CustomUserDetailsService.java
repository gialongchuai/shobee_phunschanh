package com.example.demo.service;

import com.example.demo.configuration.Translator;
import com.example.demo.exception.SecurityErrorCode;
import com.example.demo.exception.custom.AppException;
import com.example.demo.exception.custom.ResourceNotFoundException;
import com.example.demo.model.CustomUserDetails;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new AppException(SecurityErrorCode.UNAUTHENTICATED));
        return new CustomUserDetails(user);
    }
}
