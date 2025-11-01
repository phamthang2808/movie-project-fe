# 🔍 CÁCH TÌM OAUTH REQUEST TRONG NETWORK TAB

## 📍 VỊ TRÍ REQUEST CẦN TÌM:

Khi bạn click "Đăng nhập bằng Google", trong Network tab sẽ có request:

### **Request chính:**
- **Tên:** `auth` hoặc `o/oauth2/v2/auth` hoặc `oauth2/v2/auth`
- **URL:** `https://accounts.google.com/o/oauth2/v2/auth?client_id=...&redirect_uri=...`
- **Method:** `GET`
- **Type:** `document` hoặc `xhr`

### **Cách tìm:**

1. **Xem danh sách requests** trong Network tab (cột bên trái)
2. **Tìm request có:**
   - Tên chứa `auth` hoặc `oauth`
   - URL chứa `accounts.google.com/o/oauth2`
3. **Click vào request đó**
4. **Xem tab "Headers"**
5. **Tìm trong "Request URL"** hoặc **"Query String Parameters"**

---

## 🎯 VỊ TRÍ REDIRECT URI:

### **Option 1: Trong Request URL**
- Click vào request `auth` hoặc `o/oauth2/v2/auth`
- Tab **Headers**
- Phần **General** → **Request URL**
- Tìm `redirect_uri=` trong URL
- Copy và decode

### **Option 2: Query String Parameters**
- Click vào request
- Tab **Headers**
- Scroll xuống phần **Query String Parameters** (nếu có)
- Tìm `redirect_uri` và xem giá trị

---

## 📝 VÍ DỤ REQUEST URL:

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

**Sau khi decode `redirect_uri`:**
```
http://localhost:5173/auth/google/callback
```

---

## 🔍 NẾU KHÔNG THẤY REQUEST:

1. **Clear Network log** (icon Clear hoặc Ctrl+L)
2. **Check filter** - đảm bảo "All" được chọn, không filter "Fetch/XHR" 
3. **Click lại "Đăng nhập bằng Google"**
4. **Tìm trong danh sách requests ngay sau khi click**

---

## 💡 TIP:

Request này xuất hiện **NGAY KHI** bạn click button, **TRƯỚC KHI** redirect đến trang Google error.

---

**Last Updated:** 2024-01-15


