# 🧪 HƯỚNG DẪN TEST EMAIL VERIFICATION

## ⚠️ CHUẨN BỊ TRƯỚC KHI TEST

### 1. **Kiểm tra Backend đang chạy:**

```bash
# Vào thư mục backend
cd backend

# Chạy backend
mvn spring-boot:run
# hoặc
./mvnw spring-boot:run
```

**✅ Khi chạy thành công, bạn sẽ thấy:**

```
Started MovieProjectBeApplication in X.XXX seconds
```

**🔗 Backend URL:** `http://localhost:8080`

---

### 2. **Cấu hình Gmail (QUAN TRỌNG):**

Sửa file: `backend/src/main/resources/application.properties`

```properties
spring.mail.username=YOUR_EMAIL@gmail.com
spring.mail.password=YOUR_APP_PASSWORD  # 16 ký tự, không có dấu cách
```

**📝 Chưa có App Password?**

1. Vào: https://myaccount.google.com/apppasswords
2. Tạo App Password cho "Mail" → "Other" → "Movie Project"
3. Copy 16 ký tự → Paste vào `spring.mail.password`

---

## 🧪 TEST BƯỚC 1: REGISTER (Đăng ký)

### **A. Dùng Postman:**

**Request:**

```
POST http://localhost:8080/api/v1/auth/register
Content-Type: application/json
Accept-Language: vi
```

**Body (JSON):**

```json
{
  "name": "Test User",
  "email": "YOUR_EMAIL@gmail.com",
  "password": "123456"
}
```

**✅ Kết quả mong đợi:**

```json
{
  "token": "eyJhbGci...",
  "refreshToken": "eyJhbGci...",
  "user": {
    "id": 1,
    "name": "Test User",
    "email": "YOUR_EMAIL@gmail.com",
    "isEmailVerified": false  ← CHƯA VERIFY
  }
}
```

**📧 Check Email:**

- Mở Gmail của bạn
- Tìm email từ `your-email@gmail.com` (email bạn cấu hình)
- Subject: "Xác thực tài khoản Movie Project"
- **Copy LINK trong email** (sẽ cần dùng ở bước sau)

**Link sẽ có dạng:**

```
http://localhost:5173/verify-email?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### **B. Dùng Frontend:**

1. Mở browser: `http://localhost:5173/register`
2. Điền form:
   - Tên: Test User
   - Email: YOUR_EMAIL@gmail.com
   - Password: 123456
3. Click "Đăng ký"
4. **Check Email** (giống như trên)

---

## 🧪 TEST BƯỚC 2: VERIFY EMAIL (Xác thực)

### **A. Dùng Postman:**

**Copy token từ email** (phần sau `?token=`)

**Request:**

```
POST http://localhost:8080/api/v1/auth/verify-email?token=YOUR_TOKEN_HERE
Accept-Language: vi
```

**✅ Kết quả mong đợi:**

```json
{}
```

(Status 200 OK)

---

### **B. Dùng Frontend (Dễ nhất):**

1. **Copy link từ email**
2. **Paste vào browser** → Enter
3. Trang `/verify-email` sẽ tự động:
   - Gửi request verify
   - Hiển thị "✅ Xác thực thành công!"
   - Tự động chuyển về `/login` sau 3 giây

**Hoặc mở trực tiếp:**

```
http://localhost:5173/verify-email?token=YOUR_TOKEN_HERE
```

---

## 🧪 TEST BƯỚC 3: LOGIN (Đăng nhập)

### **A. Dùng Postman:**

**Request:**

```
POST http://localhost:8080/api/v1/auth/login
Content-Type: application/json
Accept-Language: vi
```

**Body (JSON):**

```json
{
  "email": "YOUR_EMAIL@gmail.com",
  "password": "123456"
}
```

**✅ Kết quả mong đợi:**

```json
{
  "token": "eyJhbGci...",
  "refreshToken": "eyJhbGci...",
  "user": {
    "id": 1,
    "email": "YOUR_EMAIL@gmail.com",
    "isEmailVerified": true  ← ĐÃ VERIFY!
  }
}
```

---

### **B. Dùng Frontend:**

1. Mở: `http://localhost:5173/login`
2. Điền:
   - Email: YOUR_EMAIL@gmail.com
   - Password: 123456
3. Click "Đăng nhập"
4. ✅ **Đăng nhập thành công!**

---

## 🔍 KIỂM TRA LOGS

### **Backend Console sẽ hiển thị:**

**Khi Register:**

```
✅ Đã gửi email xác thực đến: YOUR_EMAIL@gmail.com
```

**Khi Verify:**

```
(No special log, nhưng database sẽ update isEmailVerified = true)
```

**Nếu có lỗi:**

```
❌ Lỗi khi gửi email đến: YOUR_EMAIL@gmail.com
...
```

---

## 🐛 TROUBLESHOOTING

### **Lỗi 1: "Could not authenticate"**

**Nguyên nhân:** App Password sai

**Giải pháp:**

1. Kiểm tra lại `spring.mail.password` trong `application.properties`
2. Tạo lại App Password
3. Restart backend

---

### **Lỗi 2: Email không gửi được**

**Kiểm tra:**

1. Backend console có log lỗi không?
2. Gmail có bật "Less secure app access"? (không cần nếu dùng App Password)
3. Firewall có chặn port 587?

**Test SMTP thủ công:**

```bash
# Nếu dùng telnet
telnet smtp.gmail.com 587
```

---

### **Lỗi 3: "Token không hợp lệ" khi verify**

**Nguyên nhân:**

- Token đã hết hạn (24 giờ)
- Token đã được verify rồi
- Token sai format

**Giải pháp:**

- Register lại để lấy token mới

---

### **Lỗi 4: Frontend không chạy**

```bash
# Terminal mới
npm run dev
```

Frontend sẽ chạy tại: `http://localhost:5173`

---

## ✅ CHECKLIST TEST

- [ ] Backend đang chạy (port 8080)
- [ ] Frontend đang chạy (port 5173)
- [ ] Gmail App Password đã cấu hình
- [ ] Test Register → Nhận email
- [ ] Test Verify Email → Thành công
- [ ] Test Login → `isEmailVerified = true`

---

## 🎯 QUICK TEST (5 phút)

```bash
# Terminal 1: Backend
cd backend
mvn spring-boot:run

# Terminal 2: Frontend
npm run dev
```

1. Mở Postman → Register với email thật
2. Check Gmail → Copy link
3. Mở link trong browser → Auto verify
4. Login trong Postman/Frontend → Done!

---

**Last Updated:** 2024-01-15
