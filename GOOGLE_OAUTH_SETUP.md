# 🔐 HƯỚNG DẪN CẤU HÌNH GOOGLE OAUTH

## ✅ ĐÃ HOÀN THÀNH

Tôi đã implement chức năng đăng ký/đăng nhập bằng Google cho frontend:

### **Files đã tạo/sửa:**

1. ✅ `src/utils/googleOAuth.js` - Utility xử lý Google OAuth
2. ✅ `src/services/api/authApi.js` - Thêm method `googleLogin()`
3. ✅ `src/pages/Auth/GoogleCallback.jsx` - Page xử lý callback từ Google
4. ✅ `src/pages/Auth/Register.jsx` - Thêm nút "Đăng ký bằng Google"
5. ✅ `src/pages/Auth/Login.jsx` - Thêm nút "Đăng nhập bằng Google"
6. ✅ `src/App.jsx` - Thêm route `/auth/google/callback`

---

## 🔧 CẤU HÌNH GOOGLE OAUTH

### **Bước 1: Tạo Google OAuth Credentials**

1. Truy cập [Google Cloud Console](https://console.cloud.google.com/)
2. Tạo project mới hoặc chọn project hiện có
3. Vào **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth client ID**
5. Nếu chưa có, tạo **OAuth consent screen** trước:
   - Chọn **User Type** (External hoặc Internal)
   - Điền thông tin app
   - Add scopes: `email`, `profile`
   - Add test users (nếu chưa publish)
6. Tạo **OAuth 2.0 Client ID**:
   - **Application type**: Web application
   - **Name**: Movie Project (hoặc tên bạn muốn)
   - **Authorized redirect URIs**: 
     ```
     http://localhost:5173/auth/google/callback
     http://localhost:8080/auth/google/callback
     ```
     (Thêm cả production URL khi deploy)

7. **Copy Client ID và Client Secret**

---

### **Bước 2: Cấu hình Frontend**

Tạo file `.env` trong root project (nếu chưa có):

```env
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

**HOẶC** sửa trực tiếp trong `src/utils/googleOAuth.js`:

```javascript
clientId: "your-google-client-id.apps.googleusercontent.com",
```

---

### **Bước 3: Cấu hình Backend**

Backend cần có endpoint `/api/v1/auth/google` để xử lý code từ frontend:

```java
@PostMapping("/auth/google")
public ResponseEntity<AuthResponse> googleLogin(@RequestBody GoogleAuthRequest request) {
    // 1. Exchange authorization code với Google để lấy access_token
    // 2. Dùng access_token để lấy user info từ Google API
    // 3. Check xem user đã tồn tại chưa (theo email)
    //    - Nếu chưa → Tạo user mới với:
    //      • email (từ Google)
    //      • fullName (từ Google)
    //      • avatar (từ Google)
    //      • isEmailVerified = true
    //      • provider = "google"
    //    - Nếu có → Login user đó
    // 4. Tạo JWT token
    // 5. Return token + user info
}
```

**Request Body:**
```json
{
  "code": "4/0Axxx..."
}
```

**Response:**
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
  }
}
```

---

## 🔄 FLOW HOẠT ĐỘNG

```
1. User click "Đăng nhập bằng Google"
   ↓
2. Frontend redirect đến Google OAuth
   URL: https://accounts.google.com/o/oauth2/v2/auth?...
   ↓
3. User chọn Google account và authorize
   ↓
4. Google redirect về:
   http://localhost:5173/auth/google/callback?code=4/0Axxx...&state=login
   ↓
5. GoogleCallback page nhận code
   ↓
6. Frontend gửi code lên Backend:
   POST /api/v1/auth/google
   Body: { "code": "4/0Axxx..." }
   ↓
7. Backend:
   - Exchange code với Google → access_token
   - Lấy user info từ Google API
   - Check/Create user
   - Tạo JWT token
   - Return token + user info
   ↓
8. Frontend lưu token và redirect về home
```

---

## 🧪 TEST

### **1. Cấu hình Client ID**

Sửa trong `src/utils/googleOAuth.js` hoặc thêm vào `.env`:
```env
VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
```

### **2. Test trên localhost**

1. Start frontend: `npm run dev`
2. Vào `/login` hoặc `/register`
3. Click "Đăng nhập/Đăng ký bằng Google"
4. Chọn Google account
5. Kiểm tra redirect và callback

### **3. Kiểm tra Console**

Mở Developer Tools → Console để xem logs:
- `✅ Google OAuth success`
- `❌ Google OAuth error: ...`

---

## 🐛 TROUBLESHOOTING

### **Lỗi: "redirect_uri_mismatch"**

**Nguyên nhân:** Redirect URI không khớp với Google Console

**Giải pháp:**
1. Vào Google Cloud Console → Credentials
2. Kiểm tra **Authorized redirect URIs** có đúng:
   ```
   http://localhost:5173/auth/google/callback
   ```
3. Đảm bảo không có trailing slash hoặc query params

---

### **Lỗi: "Google OAuth chưa được cấu hình"**

**Nguyên nhân:** Chưa set `VITE_GOOGLE_CLIENT_ID` hoặc chưa sửa trong code

**Giải pháp:**
1. Tạo file `.env` với `VITE_GOOGLE_CLIENT_ID`
2. Hoặc sửa trực tiếp trong `src/utils/googleOAuth.js`
3. Restart dev server sau khi sửa `.env`

---

### **Lỗi: "Invalid code"**

**Nguyên nhân:** Code đã hết hạn hoặc đã được dùng

**Giải pháp:**
- Code chỉ dùng được 1 lần
- Code có thời hạn ngắn
- Thử lại từ đầu

---

### **Backend không nhận được request**

**Nguyên nhân:** Backend chưa có endpoint hoặc URL sai

**Giải pháp:**
1. Kiểm tra Backend có endpoint `/api/v1/auth/google`
2. Kiểm tra `API_CONFIG.BASE_URL` trong `src/services/api/config.js`
3. Kiểm tra CORS settings trên Backend

---

## 📝 LƯU Ý

### **Security:**
1. **KHÔNG commit Client ID vào Git** (trừ khi public)
2. Sử dụng environment variables cho production
3. Client Secret chỉ dùng ở Backend, KHÔNG đặt ở Frontend

### **Production:**
1. Thêm production redirect URI vào Google Console:
   ```
   https://yourdomain.com/auth/google/callback
   ```
2. Đảm bảo HTTPS (Google yêu cầu HTTPS cho production)
3. Set `VITE_GOOGLE_CLIENT_ID` trong production environment

### **User Experience:**
- User có thể chọn: Đăng ký bằng form HOẶC Google
- Nếu user đã có account (cùng email), Google login sẽ login vào account đó
- Email tự động verified (`isEmailVerified = true`)

---

## 🎯 NEXT STEPS

1. ✅ Frontend đã hoàn thành
2. ⏳ Backend cần implement endpoint `/api/v1/auth/google`
3. ⏳ Test flow hoàn chỉnh
4. ⏳ Deploy và cấu hình production

---

## 📚 REFERENCES

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Google Cloud Console](https://console.cloud.google.com/)
- [OAuth 2.0 Flow](https://oauth.net/2/)

---

**Last Updated:** 2024-01-15

