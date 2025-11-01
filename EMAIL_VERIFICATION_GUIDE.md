# 📧 HƯỚNG DẪN XÁC THỰC EMAIL

## ✅ ĐÃ CẤU HÌNH

Tôi đã setup **Email Verification** cho backend của bạn:

### 1. **Dependencies Đã Thêm**
- ✅ `spring-boot-starter-mail` trong `pom.xml`

### 2. **Configuration**
- ✅ Email config trong `application.properties`
- ✅ EmailService để gửi email
- ✅ Endpoint `/api/v1/auth/verify-email`
- ✅ Auto send verification email khi register

### 3. **Flow**
```
Register → Send Verification Email → User Click Link → Verify Email → Can Login
```

---

## 🔧 CẤU HÌNH GMAIL

### **Bước 1: Tạo App Password**

1. Đăng nhập Google Account của bạn
2. Vào: **Google Account** → **Security** → **2-Step Verification** (bật nếu chưa bật)
3. Vào: **App passwords** → **Select app** (chọn "Mail") → **Select device** (chọn "Other") → Nhập "Movie Project"
4. Click **Generate**
5. Copy **App Password** (16 ký tự, không có dấu cách)

### **Bước 2: Cập nhật `application.properties`**

```properties
# Email Configuration (Gmail SMTP)
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your-email@gmail.com
spring.mail.password=xxxx-xxxx-xxxx-xxxx  # Paste App Password vào đây
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
spring.mail.properties.mail.smtp.starttls.required=true

# Application URL (for email links)
app.base-url=http://localhost:5173
```

---

## 📨 EMAIL TEMPLATE

### **Subject:** 
```
Xác thực tài khoản Movie Project
```

### **Content:**
```
Chào mừng bạn đến với Movie Project!

Vui lòng click vào link sau để xác thực tài khoản của bạn:
http://localhost:5173/verify-email?token=eyJhbGc...

Link có hiệu lực trong 24 giờ.

Trân trọng,
Đội ngũ Movie Project
```

---

## 🧪 TEST VỚI POSTMAN

### **1. Register**

```http
POST http://localhost:8080/api/v1/auth/register
Content-Type: application/json
Accept-Language: vi

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "123456"
}
```

**Response:**
```json
{
  "token": "...",
  "user": {
    "id": 1,
    "email": "test@example.com",
    "isEmailVerified": false
  }
}
```

**✅ Email sẽ được gửi đến: `test@example.com`**

---

### **2. Verify Email**

Copy token từ email, sau đó:

```http
POST http://localhost:8080/api/v1/auth/verify-email?token=eyJhbGc...
Accept-Language: vi
```

**Response:**
```json
{}
```

**✅ User `isEmailVerified` = true**

---

### **3. Login**

```http
POST http://localhost:8080/api/v1/auth/login
Content-Type: application/json
Accept-Language: vi

{
  "email": "test@example.com",
  "password": "123456"
}
```

**Response:**
```json
{
  "token": "...",
  "user": {
    "id": 1,
    "email": "test@example.com",
    "isEmailVerified": true  ✅
  }
}
```

---

## 🐛 TROUBLESHOOTING

### **Lỗi: "Could not authenticate"**

**Nguyên nhân:** App Password sai hoặc chưa tạo

**Giải pháp:**
1. Kiểm tra lại App Password trong `application.properties`
2. Đảm bảo đã bật **2-Step Verification**
3. Tạo lại App Password nếu cần

---

### **Lỗi: "Invalid token" khi verify**

**Nguyên nhân:** Token đã hết hạn hoặc đã được verify

**Giải pháp:**
1. Register lại để lấy token mới
2. Token có hiệu lực 24 giờ

---

### **Email không gửi được**

**Nguyên nhân:** 
- SMTP settings sai
- Firewall chặn port 587

**Giải pháp:**
1. Kiểm tra log trong console
2. Đảm bảo port 587 không bị chặn
3. Thử với email khác

---

## 🔐 SECURITY NOTES

### **Important:**
1. **KHÔNG commit App Password vào Git**
2. Sử dụng environment variables cho production
3. Token verification expires sau 24h
4. User không thể login nếu chưa verify email

---

## 📝 CODE CHANGES

### **Files Created:**
1. `EmailService.java` - Gửi email
2. `DataInitializer.java` - Tạo roles mặc định

### **Files Modified:**
1. `AuthService.java` - Thêm `verifyEmail()` và gửi email khi register
2. `AuthController.java` - Thêm endpoint `/verify-email`
3. `JwtService.java` - Thêm `generateVerificationToken()`
4. `application.properties` - Thêm email config
5. `pom.xml` - Thêm mail dependency

---

## 🎯 NEXT STEPS

1. **Update Gmail credentials** trong `application.properties`
2. **Run backend** và test register
3. **Check inbox** để verify email
4. **Click link** để verify email
5. **Login** để kiểm tra `isEmailVerified`

---

## 📚 REFERENCES

- [Gmail App Passwords](https://support.google.com/accounts/answer/185833)
- [Spring Boot Mail](https://spring.io/guides/gs/sending-email/)
- [JWT Verification](https://jwt.io/)

---

**Last Updated:** 2024-01-15

