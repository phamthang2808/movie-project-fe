# 🔧 AXIOS INTERCEPTORS - TỰ ĐỘNG GỬI TOKEN

**Date:** 2025-01-29  
**Status:** ✅ HOÀN TẤT

---

## ✅ ĐÃ CẤU HÌNH AXIOS INTERCEPTORS

### **📁 File: `src/services/api/config.js`**

```javascript
// REQUEST INTERCEPTOR - Tự động gửi token
axiosInstance.interceptors.request.use(
  (config) => {
    // 1. Bắt đầu loading bar
    NProgress.start();

    // 2. Lấy token từ localStorage
    const token = localStorage.getItem("token");

    // 3. Tự động thêm token vào header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    NProgress.done();
    return Promise.reject(error);
  }
);

// RESPONSE INTERCEPTOR - Xử lý lỗi 401
axiosInstance.interceptors.response.use(
  (response) => {
    // Hoàn thành loading bar
    NProgress.done();
    return response;
  },
  (error) => {
    NProgress.done();

    // Tự động logout khi token hết hạn
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);
```

---

## 🎯 CHỨC NĂNG

### **✅ Tự động:**

1. **Gửi token** trong mọi request (`Authorization: Bearer token`)
2. **Start/Stop NProgress** loading bar
3. **Redirect to login** khi token hết hạn (401)
4. **Xóa token** khi logout hoặc token invalid

### **✅ Config:**

- **Base URL:** `http://localhost:8080/api/v1`
- **Timeout:** 30 giây
- **With Credentials:** `true` (gửi cookies)

---

## 📝 CÁCH SỬ DỤNG

### **Không cần thêm header thủ công:**

#### ❌ TRƯỚC ĐÂY (phải thêm token thủ công):

```javascript
const response = await fetch("http://localhost:8080/api/v1/users/profile", {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
```

#### ✅ BÂY GIỜ (axios tự động thêm):

```javascript
import { userApi } from "./services/api";

const profile = await userApi.getProfile();
// Token tự động được thêm vào header! 🎉
```

---

## 🔄 CÁC API ĐÃ CẬP NHẬT

### **1. Tất cả API trong `src/services/api/`:**

- ✅ `authApi.js` - Login, register, logout
- ✅ `userApi.js` - User profile, avatar
- ✅ `movieApi.js` - Movies, favorites
- ✅ `categoryApi.js` - Categories
- ✅ `paymentApi.js` - Payment, VIP
- ✅ `notificationApi.js` - Notifications
- ✅ `uploadApi.js` - File upload

### **2. File `movieService.js`:**

- ✅ Đã update từ `instance` → `axiosInstance`
- ✅ Dùng axios instance mới với interceptors

### **3. File cũ đã xóa:**

- ❌ `src/services/api.config.js` (đã xóa, giờ dùng `api/config.js`)

---

## 🎬 VÍ DỤ

### **Login và auto-send token:**

```javascript
import { authApi, userApi } from "./services/api";

// 1. Login
const loginResponse = await authApi.login({
  email: "user@example.com",
  password: "123456",
});

// 2. Lưu token
localStorage.setItem("token", loginResponse.token);

// 3. Gọi API khác - Token tự động gửi kèm!
const profile = await userApi.getProfile();
// ✅ Header tự động có: Authorization: Bearer <token>
```

### **Upload avatar:**

```javascript
import { userApi } from "./services/api";

const avatarUrl = await userApi.uploadAvatar(file);
// ✅ Token tự động gửi kèm trong header!
```

### **Get movies:**

```javascript
import { movieApi } from "./services/api";

const movies = await movieApi.getAllMovies({ page: 1, limit: 20 });
// ✅ Token tự động gửi kèm (nếu cần auth)
```

---

## 🔐 BẢO MẬT

### **Token được lưu ở đâu?**

- `localStorage.getItem("token")`

### **Token được gửi như thế nào?**

- Header: `Authorization: Bearer <token>`

### **Khi nào token bị xóa?**

1. User đăng xuất (logout)
2. Token hết hạn (response 401)
3. Token invalid (response 401)

---

## 📊 FLOW

```
User gọi API
    ↓
Request Interceptor
    ↓
1. NProgress.start()
2. Lấy token từ localStorage
3. Thêm vào header: Authorization: Bearer <token>
    ↓
Gửi request lên server
    ↓
Server trả về response
    ↓
Response Interceptor
    ↓
1. NProgress.done()
2. Check status code
   - 200: OK → trả về data
   - 401: Token hết hạn → logout & redirect
   - Khác: throw error
    ↓
Component nhận data
```

---

## ✅ TRẠNG THÁI

```
✅ Axios interceptors configured
✅ Auto-send token in all requests
✅ Auto-redirect on 401
✅ NProgress loading bar
✅ Error handling
✅ All API files updated
✅ Old config deleted
✅ No linter errors
```

---

**Giờ bạn không cần quan tâm đến token nữa! Axios tự động lo! 🚀**
