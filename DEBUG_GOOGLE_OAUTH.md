# 🔍 DEBUG GOOGLE OAUTH - XEM REDIRECT URI THỰC TẾ

## 🎯 CÁCH XEM REDIRECT URI ĐANG ĐƯỢC GỬI

### **Cách 1: Xem trong URL khi redirect đến Google**

1. Click "Đăng nhập bằng Google"
2. **TRƯỚC KHI** trang Google load hoàn toàn, xem **address bar**
3. URL sẽ có dạng:
   ```
   https://accounts.google.com/o/oauth2/v2/auth?client_id=...&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fauth%2Fgoogle%2Fcallback&...
   ```
4. Copy URL này và decode `redirect_uri`:
   - `http%3A%2F%2Flocalhost%3A5173%2Fauth%2Fgoogle%2Fcallback`
   - Sau khi decode = `http://localhost:5173/auth/google/callback`

### **Cách 2: Xem trong Network Tab**

1. Mở Developer Tools (F12)
2. Vào tab **Network**
3. Click "Đăng nhập bằng Google"
4. Tìm request đến `accounts.google.com`
5. Click vào request đó
6. Xem **Headers** → **Query String Parameters**
7. Tìm `redirect_uri` và xem giá trị

### **Cách 3: Dùng URL Decoder Online**

1. Copy toàn bộ URL từ address bar
2. Vào: https://www.urlencoder.org/
3. Paste URL và decode
4. Tìm parameter `redirect_uri`

---

## 📝 VÍ DỤ URL ĐÚNG:

```
https://accounts.google.com/o/oauth2/v2/auth?
  client_id=434551586297-xxxxx.apps.googleusercontent.com
  &redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fauth%2Fgoogle%2Fcallback
  &response_type=code
  &scope=email%20profile
  &access_type=offline
  &prompt=select_account
  &state=login
```

Sau khi decode `redirect_uri`:

```
http://localhost:5173/auth/google/callback
```

---

## ✅ CHECKLIST:

- [ ] Redirect URI trong URL: `http://localhost:5173/auth/google/callback`
- [ ] Redirect URI trong Google Console: `http://localhost:5173/auth/google/callback`
- [ ] Cả hai **KHỚP CHÍNH XÁC 100%**
- [ ] Không có space, không có trailing slash `/`

---

## 🐛 NẾU VẪN LỖI:

1. **Đảm bảo đã Save trong Google Console**
2. **Đợi 5-10 phút** sau khi Save
3. **Thử Incognito mode** (Ctrl+Shift+N)
4. **Clear browser cache**

---

**Last Updated:** 2024-01-15
