# 🔧 SỬA LỖI REDIRECT_URI_MISMATCH

## ❌ LỖI:

```
Error 400: redirect_uri_mismatch
Đã chặn quyền truy cập: Yêu cầu của movie không hợp lệ
```

## 🔍 NGUYÊN NHÂN:

Redirect URI mà frontend gửi lên Google **KHÔNG KHỚP** với URI đã đăng ký trong Google Console.

---

## ✅ CÁCH SỬA:

### **Bước 1: Kiểm tra Redirect URI hiện tại**

Mở Developer Console (F12) → Console, click "Đăng nhập bằng Google" và xem log:

```
🔍 Google OAuth Redirect URI: http://localhost:5173/auth/google/callback
🔍 Current origin: http://localhost:5173
```

Ghi lại URI này (ví dụ: `http://localhost:5173/auth/google/callback`)

### **Bước 2: Vào Google Cloud Console**

1. Truy cập: https://console.cloud.google.com/
2. Chọn project của bạn
3. Vào **APIs & Services** → **Credentials**
4. Click vào OAuth 2.0 Client ID của bạn (tên: "movie-project-java")

### **Bước 3: Kiểm tra "Authorized redirect URIs"**

Ở phần **"Authorized redirect URIs"**, kiểm tra xem có URI này chưa:

```
http://localhost:5173/auth/google/callback
```

### **Bước 4: Thêm URI nếu chưa có**

1. Click **"+ Add URI"**
2. Nhập chính xác:
   ```
   http://localhost:5173/auth/google/callback
   ```
3. **Lưu ý quan trọng:**
   - ✅ Phải có `http://` (không phải `https://`)
   - ✅ Phải có `localhost:5173` (port đúng)
   - ✅ Phải có `/auth/google/callback` (path đúng)
   - ✅ Không có dấu `/` cuối cùng
   - ✅ Không có space hoặc ký tự đặc biệt

### **Bước 5: Save và đợi**

- Click **"Save"**
- Google có thể mất vài phút để cập nhật
- Đợi 2-3 phút rồi thử lại

### **Bước 6: Test lại**

1. Refresh trang frontend
2. Click "Đăng nhập bằng Google" lại
3. Kiểm tra xem còn lỗi không

---

## 🎯 CHECKLIST:

- [ ] Redirect URI trong code: `http://localhost:5173/auth/google/callback`
- [ ] Redirect URI trong Google Console: `http://localhost:5173/auth/google/callback`
- [ ] Cả hai phải **KHỚP CHÍNH XÁC 100%**
- [ ] Đã Save trong Google Console
- [ ] Đã đợi 2-3 phút sau khi Save

---

## 🐛 NẾU VẪN LỖI:

### **1. Kiểm tra port:**

- Nếu dev server chạy trên port khác (ví dụ: 5174), cần thêm URI đó:
  ```
  http://localhost:5174/auth/google/callback
  ```

### **2. Kiểm tra origin:**

- Mở Console → xem log `Current origin`
- Đảm bảo URI trong Google Console khớp với origin này

### **3. Clear cache:**

- Clear browser cache
- Hoặc thử Incognito/Private mode

### **4. Kiểm tra lại trong Google Console:**

- Đảm bảo đã Save thành công
- Kiểm tra không có typo

---

## 📝 URI CẦN THÊM (nếu deploy):

Khi deploy production, cần thêm:

```
https://yourdomain.com/auth/google/callback
```

---

**Last Updated:** 2024-01-15

