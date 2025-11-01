package com.example.thangcachep.movie_project_be.controllers;

import com.example.thangcachep.movie_project_be.dto.request.LoginRequest;
import com.example.thangcachep.movie_project_be.dto.request.RegisterRequest;
import com.example.thangcachep.movie_project_be.dto.response.AuthResponse;
import com.example.thangcachep.movie_project_be.services.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {
    
    private final AuthService authService;
    
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        // JWT is stateless, logout is handled on client side
        return ResponseEntity.ok().build();
    }
}


