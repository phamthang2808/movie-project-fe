package com.example.thangcachep.movie_project_be.services.impl;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.example.thangcachep.movie_project_be.entities.RoleEntity;
import com.example.thangcachep.movie_project_be.entities.UserEntity;
import com.example.thangcachep.movie_project_be.models.dto.GoogleUserInfo;
import com.example.thangcachep.movie_project_be.models.request.LoginRequest;
import com.example.thangcachep.movie_project_be.models.request.RegisterRequest;
import com.example.thangcachep.movie_project_be.models.responses.AuthResponse;
import com.example.thangcachep.movie_project_be.models.responses.UserResponse;
import com.example.thangcachep.movie_project_be.repositories.RoleRepository;
import com.example.thangcachep.movie_project_be.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final EmailService emailService;
    private final RestTemplate restTemplate = new RestTemplate();
    
    @Value("${google.oauth.client-id:}")
    private String googleClientId;
    
    @Value("${google.oauth.client-secret:}")
    private String googleClientSecret;
    
    @Value("${google.oauth.redirect-uri:http://localhost:5173/auth/google/callback}")
    private String googleRedirectUri;
    
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


        // Generate verification token and send email
        String verificationToken = jwtService.generateVerificationToken(user);
        emailService.sendVerificationEmail(user.getEmail(), verificationToken);

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

    @Transactional
    public void verifyEmail(String token) {
        // Extract email from token
        String email = jwtService.extractUsername(token);

        // Find user
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Người dùng không tồn tại"));

        // Check if already verified
        if (user.getIsEmailVerified()) {
            throw new RuntimeException("Email đã được xác thực");
        }

        // Verify email
        user.setIsEmailVerified(true);
        userRepository.save(user);
    }

    /**
     * Google OAuth Login/Register
     * Exchange code với Google để lấy user info và login/register
     */
    @Transactional
    public AuthResponse googleLogin(String code) {
        try {
            // 1. Exchange code với Google để lấy access_token
            String accessToken = exchangeCodeForToken(code);
            
            // 2. Lấy user info từ Google API
            GoogleUserInfo googleUser = getUserInfoFromGoogle(accessToken);
            
            // 3. Check xem user đã tồn tại chưa (theo email)
            Optional<UserEntity> existingUser = userRepository.findByEmail(googleUser.getEmail());
            
            UserEntity user;
            if (existingUser.isPresent()) {
                // User đã tồn tại → Login
                user = existingUser.get();
            } else {
                // User chưa tồn tại → Tạo mới
                user = createUserFromGoogle(googleUser);
            }
            
            // 4. Tạo JWT token
            String token = jwtService.generateToken(user);
            String refreshToken = jwtService.generateRefreshToken(user);
            
            // 5. Trả về AuthResponse
            return AuthResponse.builder()
                .token(token)
                .refreshToken(refreshToken)
                .user(mapToUserResponse(user))
                .build();
                
        } catch (Exception e) {
            throw new RuntimeException("Google OAuth thất bại: " + e.getMessage());
        }
    }

    /**
     * Exchange authorization code với Google để lấy access_token
     */
    private String exchangeCodeForToken(String code) {
        String tokenUrl = "https://oauth2.googleapis.com/token";
        
        // Prepare request body
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("code", code);
        params.add("client_id", googleClientId);
        params.add("client_secret", googleClientSecret);
        params.add("redirect_uri", googleRedirectUri);
        params.add("grant_type", "authorization_code");
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);
        
        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(tokenUrl, request, Map.class);
            Map<String, Object> responseBody = response.getBody();
            
            // Kiểm tra lỗi từ Google
            if (responseBody != null && responseBody.containsKey("error")) {
                String error = (String) responseBody.get("error");
                String errorDescription = (String) responseBody.getOrDefault("error_description", "");
                
                // invalid_grant thường do code đã hết hạn hoặc đã được dùng
                if ("invalid_grant".equals(error)) {
                    throw new RuntimeException("Authorization code không hợp lệ hoặc đã hết hạn. " + 
                        "Vui lòng thử lại từ đầu. " + errorDescription);
                }
                
                throw new RuntimeException("Google OAuth error: " + error + " - " + errorDescription);
            }
            
            if (responseBody == null || !responseBody.containsKey("access_token")) {
                throw new RuntimeException("Không thể lấy access token từ Google");
            }
            
            return (String) responseBody.get("access_token");
        } catch (RuntimeException e) {
            // Re-throw RuntimeException
            throw e;
        } catch (Exception e) {
            // Xử lý các exception khác từ RestTemplate
            String errorMessage = e.getMessage();
            if (errorMessage != null && errorMessage.contains("400")) {
                throw new RuntimeException("Lỗi khi exchange code với Google: Code không hợp lệ hoặc đã hết hạn. " +
                    "Vui lòng thử lại từ đầu.");
            }
            throw new RuntimeException("Lỗi khi exchange code với Google: " + errorMessage);
        }
    }

    /**
     * Lấy user info từ Google API
     */
    private GoogleUserInfo getUserInfoFromGoogle(String accessToken) {
        String userInfoUrl = "https://www.googleapis.com/oauth2/v2/userinfo";
        
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        
        HttpEntity<?> entity = new HttpEntity<>(headers);
        
        try {
            ResponseEntity<GoogleUserInfo> response = restTemplate.exchange(
                userInfoUrl,
                HttpMethod.GET,
                entity,
                GoogleUserInfo.class
            );
            
            GoogleUserInfo googleUser = response.getBody();
            if (googleUser == null || googleUser.getEmail() == null) {
                throw new RuntimeException("Không thể lấy thông tin user từ Google");
            }
            
            return googleUser;
        } catch (Exception e) {
            throw new RuntimeException("Lỗi khi lấy thông tin user từ Google: " + e.getMessage());
        }
    }

    /**
     * Tạo user mới từ Google info
     */
    private UserEntity createUserFromGoogle(GoogleUserInfo googleUser) {
        // Get USER role
        RoleEntity userRole = roleRepository.findByName("USER")
            .orElseThrow(() -> new RuntimeException("Role USER không tồn tại"));
        
        // Tạo user mới với thông tin từ Google
        UserEntity newUser = UserEntity.builder()
            .email(googleUser.getEmail())
            .password("") // Không cần password cho Google users
            .name(googleUser.getName() != null ? googleUser.getName() : 
                  (googleUser.getGivenName() + " " + googleUser.getFamilyName()).trim())
            .avatarUrl(googleUser.getPicture())
            .role(userRole)
            .balance(0.0)
            .isVip(false)
            .isEmailVerified(true) // Google đã verify email rồi
            .isActive(true)
            .build();
        
        return userRepository.save(newUser);
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


