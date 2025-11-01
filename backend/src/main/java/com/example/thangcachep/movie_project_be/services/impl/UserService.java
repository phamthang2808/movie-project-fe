package com.example.thangcachep.movie_project_be.services.impl;

import com.example.thangcachep.movie_project_be.entities.UserEntity;
import com.example.thangcachep.movie_project_be.models.responses.UserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {
    
    @Transactional
    public UserResponse updateProfile(UserEntity user, UserResponse request) {
        if (request.getName() != null) {
            user.setName(request.getName());
        }
        if (request.getEmail() != null) {
            user.setEmail(request.getEmail());
        }
        // Note: avatar update should be handled separately via upload endpoint
        
        return mapToUserResponse(user);
    }
    
    public UserResponse mapToUserResponse(UserEntity user) {
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


