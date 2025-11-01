# 🔧 HƯỚNG DẪN IMPLEMENT GOOGLE OAUTH CHO BACKEND

## 📋 TÓM TẮT

Backend cần tạo endpoint `POST /api/v1/auth/google` để:

1. Nhận authorization code từ frontend
2. Exchange code với Google để lấy access_token
3. Dùng access_token để lấy user info từ Google API
4. Check/Create user trong database
5. Tạo JWT token và trả về

---

## 📦 DEPENDENCIES CẦN THÊM

Thêm vào `pom.xml`:

```xml
<!-- HTTP Client để gọi Google API -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-webflux</artifactId>
</dependency>

<!-- Hoặc dùng RestTemplate (đã có sẵn trong spring-boot-starter-web) -->
```

**Lưu ý:** Nếu đã có `spring-boot-starter-web` thì có thể dùng `RestTemplate` hoặc `WebClient` mà không cần thêm dependency.

---

## 🔑 GOOGLE OAUTH CONFIGURATION

Thêm vào `application.properties` hoặc `application.yml`:

```properties
# Google OAuth Configuration
google.oauth.client-id=your-google-client-id.apps.googleusercontent.com
google.oauth.client-secret=your-google-client-secret
google.oauth.redirect-uri=http://localhost:5173/auth/google/callback
```

**Lưu ý:**

- Lấy `client-id` và `client-secret` từ Google Cloud Console
- `redirect-uri` phải khớp với frontend

---

## 📝 CODE CẦN TẠO/SỬA

### **1. Tạo Request DTO**

File: `models/request/GoogleAuthRequest.java`

```java
package com.example.thangcachep.movie_project_be.models.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class GoogleAuthRequest {
    @NotBlank(message = "Authorization code không được để trống")
    private String code;
}
```

---

### **2. Thêm method vào AuthService**

File: `services/impl/AuthService.java`

Thêm method mới:

```java
/**
 * Google OAuth Login/Register
 */
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

        // 5. Trả về AuthResponse
        return AuthResponse.builder()
            .token(token)
            .user(mapToUserResponse(user))
            .message("Đăng nhập bằng Google thành công")
            .build();

    } catch (Exception e) {
        throw new RuntimeException("Google OAuth thất bại: " + e.getMessage());
    }
}

/**
 * Exchange authorization code với Google để lấy access_token
 */
private String exchangeCodeForToken(String code) {
    // Gọi Google Token API
    // POST https://oauth2.googleapis.com/token
    // Body: {
    //   "code": "...",
    //   "client_id": "...",
    //   "client_secret": "...",
    //   "redirect_uri": "...",
    //   "grant_type": "authorization_code"
    // }
}

/**
 * Lấy user info từ Google API
 */
private GoogleUserInfo getUserInfoFromGoogle(String accessToken) {
    // Gọi Google UserInfo API
    // GET https://www.googleapis.com/oauth2/v2/userinfo
    // Header: Authorization: Bearer {accessToken}
}

/**
 * Tạo user mới từ Google info
 */
private UserEntity createUserFromGoogle(GoogleUserInfo googleUser) {
    // Tạo user với:
    // - email: từ Google
    // - fullName: từ Google
    // - avatar: từ Google
    // - isEmailVerified: true (vì Google đã verify)
    // - provider: "google"
}
```

---

### **3. Tạo GoogleUserInfo DTO**

File: `models/dto/GoogleUserInfo.java`

```java
package com.example.thangcachep.movie_project_be.models.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class GoogleUserInfo {
    private String id;
    private String email;

    @JsonProperty("verified_email")
    private Boolean verifiedEmail;

    private String name;
    private String picture; // Avatar URL

    @JsonProperty("given_name")
    private String givenName;

    @JsonProperty("family_name")
    private String familyName;
}
```

---

### **4. Thêm endpoint vào AuthController**

File: `controllers/AuthController.java`

```java
@PostMapping("/google")
public ResponseEntity<AuthResponse> googleLogin(@RequestBody GoogleAuthRequest request) {
    try {
        AuthResponse response = authService.googleLogin(request.getCode());
        return ResponseEntity.ok(response);
    } catch (Exception e) {
        // Handle error
        throw new RuntimeException("Google OAuth failed: " + e.getMessage());
    }
}
```

---

## 🔄 FLOW CHI TIẾT

### **Step 1: Exchange Code for Token**

```java
RestTemplate restTemplate = new RestTemplate();
String tokenUrl = "https://oauth2.googleapis.com/token";

Map<String, String> params = new HashMap<>();
params.put("code", code);
params.put("client_id", googleClientId);
params.put("client_secret", googleClientSecret);
params.put("redirect_uri", redirectUri);
params.put("grant_type", "authorization_code");

HttpHeaders headers = new HttpHeaders();
headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

HttpEntity<Map<String, String>> request = new HttpEntity<>(params, headers);
ResponseEntity<Map> response = restTemplate.postForEntity(tokenUrl, request, Map.class);

String accessToken = (String) response.getBody().get("access_token");
```

### **Step 2: Get User Info from Google**

```java
String userInfoUrl = "https://www.googleapis.com/oauth2/v2/userinfo";

HttpHeaders headers = new HttpHeaders();
headers.setBearerAuth(accessToken);

HttpEntity<?> entity = new HttpEntity<>(headers);
ResponseEntity<GoogleUserInfo> response = restTemplate.exchange(
    userInfoUrl,
    HttpMethod.GET,
    entity,
    GoogleUserInfo.class
);

GoogleUserInfo googleUser = response.getBody();
```

### **Step 3: Check/Create User**

```java
Optional<UserEntity> existingUser = userRepository.findByEmail(googleUser.getEmail());

if (existingUser.isPresent()) {
    return existingUser.get();
} else {
    // Tạo user mới
    UserEntity newUser = new UserEntity();
    newUser.setEmail(googleUser.getEmail());
    newUser.setFullName(googleUser.getName());
    newUser.setAvatar(googleUser.getPicture());
    newUser.setEmailVerified(true); // Google đã verify
    newUser.setProvider("google");
    // Set default role, balance, etc.
    return userRepository.save(newUser);
}
```

---

## 🔐 SECURITY NOTES

1. **Client Secret:**

   - CHỈ lưu ở Backend
   - KHÔNG gửi về Frontend
   - Nên dùng environment variables

2. **Token Exchange:**

   - Phải verify code với Google
   - Không trust code từ frontend

3. **User Creation:**
   - Set `isEmailVerified = true` cho Google users
   - Có thể thêm field `provider` để phân biệt local vs Google users

---

## 🧪 TEST VỚI POSTMAN

### **Test Endpoint:**

```http
POST http://localhost:8080/api/v1/auth/google
Content-Type: application/json

{
  "code": "4/0Axxx..." // Code từ frontend
}
```

**Response mong đợi:**

```json
{
  "token": "eyJhbGc...",
  "user": {
    "id": 1,
    "email": "user@gmail.com",
    "fullName": "Nguyễn Văn A",
    "avatar": "https://...",
    "isEmailVerified": true,
    "provider": "google"
  },
  "message": "Đăng nhập bằng Google thành công"
}
```

---

## 📚 REFERENCES

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Exchange Code for Token](https://developers.google.com/identity/protocols/oauth2/web-server#exchange-authorization-code)
- [Get User Info](https://developers.google.com/identity/protocols/oauth2/web-server#callinganapi)

---

**Last Updated:** 2024-01-15
