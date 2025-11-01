package com.example.thangcachep.movie_project_be.services;

import com.example.thangcachep.movie_project_be.dto.request.LoginRequest;
import com.example.thangcachep.movie_project_be.dto.request.RegisterRequest;
import com.example.thangcachep.movie_project_be.dto.response.AuthResponse;
import com.example.thangcachep.movie_project_be.dto.response.UserResponse;
import com.example.thangcachep.movie_project_be.entities.RoleEntity;
import com.example.thangcachep.movie_project_be.entities.UserEntity;
import com.example.thangcachep.movie_project_be.repositories.RoleRepository;
import com.example.thangcachep.movie_project_be.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {
    
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email đã được sử dụng");
        }
        
        // Get USER role
        RoleEntity userRole = roleRepository.findByName("USER")
            .orElseThrow(() -> new RuntimeException("Role USER không tồn tại"));
        
        // Create new user
        UserEntity user = UserEntity.builder()
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getPassword()))
            .name(request.getName())
            .role(userRole)
            .balance(0.0)
            .isVip(false)
            .isEmailVerified(false)
            .isActive(true)
            .build();
        
        user = userRepository.save(user);
        
        // Generate tokens
        String token = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);
        
        // Build response
        return AuthResponse.builder()
            .token(token)
            .refreshToken(refreshToken)
            .user(mapToUserResponse(user))
            .build();
    }
    
    public AuthResponse login(LoginRequest request) {
        // Authenticate user
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
            )
        );
        
        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        // Get user from database
        UserEntity user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new RuntimeException("Người dùng không tồn tại"));
        
        // Generate tokens
        String token = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);
        
        // Build response
        return AuthResponse.builder()
            .token(token)
            .refreshToken(refreshToken)
            .user(mapToUserResponse(user))
            .build();
    }
    
    private UserResponse mapToUserResponse(UserEntity user) {
        return UserResponse.builder()
            .id(user.getId())
            .email(user.getEmail())
            .name(user.getName())
            .avatarUrl(user.getAvatarUrl())
            .role(user.getRole().getName())
            .balance(user.getBalance())
            .isVip(user.getIsVip())
            .vipExpiredAt(user.getVipExpiredAt())
            .isEmailVerified(user.getIsEmailVerified())
            .isActive(user.getIsActive())
            .createdAt(user.getCreatedAt())
            .build();
    }
}


