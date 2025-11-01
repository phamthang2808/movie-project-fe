# ✅ GOOGLE OAUTH BACKEND - ĐÃ HOÀN THÀNH

## 📋 ĐÃ IMPLEMENT

Tôi đã thêm Google OAuth vào backend:

### **1. Files đã tạo:**
- ✅ `models/request/GoogleAuthRequest.java` - Request DTO
- ✅ `models/dto/GoogleUserInfo.java` - DTO để map response từ Google API

### **2. Files đã sửa:**
- ✅ `controllers/AuthController.java` - Thêm endpoint `/api/v1/auth/google`
- ✅ `services/impl/AuthService.java` - Thêm method `googleLogin()` và các helper methods
- ✅ `application.yml` - Thêm config cho Google OAuth

---

## 🔧 CẤU HÌNH CẦN LÀM

Bạn cần điền **Google Client Secret** vào file `application.yml`:

```yaml
google:
  oauth:
    client-id: ${GOOGLE_CLIENT_ID:}  # Điền Client ID từ Google Console
    client-secret: ${GOOGLE_CLIENT_SECRET:}  # Điền Client Secret từ Google Console
    redirect-uri: ${GOOGLE_REDIRECT_URI:http://localhost:5173/auth/google/callback}
```

**Hoặc** có thể dùng environment variables:
```bash
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REDIRECT_URI=http://localhost:5173/auth/google/callback
```

---

## 📍 LẤY CLIENT SECRET

1. Vào [Google Cloud Console](https://console.cloud.google.com/)
2. Chọn project của bạn
3. Vào **APIs & Services** → **Credentials**
4. Click vào OAuth 2.0 Client ID của bạn (tên: "movie-project-java")
5. Ở phần **Customer secret codes**, bạn sẽ thấy Client Secret
6. Copy Client Secret và điền vào `application.yml`

---

## 🔄 FLOW HOẠT ĐỘNG

```
1. Frontend gửi code → POST /api/v1/auth/google
   Body: { "code": "4/0Axxx..." }
   
2. Backend exchange code với Google → Lấy access_token
   
3. Backend dùng access_token → Lấy user info từ Google API
   
4. Backend check user tồn tại:
   - Nếu có → Login
   - Nếu chưa → Tạo user mới (isEmailVerified=true)
   
5. Backend tạo JWT token → Trả về cho frontend
```

---

## 🧪 TEST

### **1. Điền Client Secret vào application.yml**

### **2. Restart Backend**

### **3. Test với Frontend:**
- Vào `/login` hoặc `/register`
- Click "Đăng nhập bằng Google" hoặc "Đăng ký bằng Google"
- Chọn Google account
- Kiểm tra xem có login được không

### **4. Test với Postman (optional):**

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
  "refreshToken": "eyJhbGc...",
  "user": {
    "id": 1,
    "email": "user@gmail.com",
    "name": "Nguyễn Văn A",
    "avatarUrl": "https://...",
    "isEmailVerified": true,
    ...
  }
}
```

---

## ⚠️ LƯU Ý

1. **Client Secret** phải được điền đúng từ Google Console
2. **Redirect URI** trong Google Console phải khớp: `http://localhost:5173/auth/google/callback`
3. **User từ Google** sẽ có:
   - `isEmailVerified = true` (Google đã verify)
   - `password = ""` (empty string, vì không dùng password)
4. **Nếu user đã tồn tại** (theo email), sẽ login vào account đó, không tạo mới

---

## 🎯 NEXT STEPS

1. ✅ Backend code đã xong
2. ⏳ Điền Client Secret vào `application.yml`
3. ⏳ Restart backend
4. ⏳ Test với frontend

---

**Last Updated:** 2024-01-15

