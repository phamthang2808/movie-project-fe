package com.example.thangcachep.movie_project_be.controllers;

import com.example.thangcachep.movie_project_be.dto.response.UserResponse;
import com.example.thangcachep.movie_project_be.entities.UserEntity;
import com.example.thangcachep.movie_project_be.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {
    
    private final UserService userService;
    
    @GetMapping("/profile")
    public ResponseEntity<UserResponse> getProfile() {
        UserEntity user = getCurrentUser();
        UserResponse response = userService.mapToUserResponse(user);
        return ResponseEntity.ok(response);
    }
    
    @PutMapping("/profile")
    public ResponseEntity<UserResponse> updateProfile(@RequestBody UserResponse request) {
        UserEntity user = getCurrentUser();
        UserResponse response = userService.updateProfile(user, request);
        return ResponseEntity.ok(response);
    }
    
    private UserEntity getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (UserEntity) authentication.getPrincipal();
    }
}


