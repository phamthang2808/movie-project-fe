# 📁 API STRUCTURE

**Base URL:** `http://localhost:8080/api/v1`  
**Created:** 2025-01-29  
**Status:** ✅ NO ERRORS

---

## 📂 CẤU TRÚC SERVICES

```
src/services/api/
├── config.js           ← API configuration & helpers
├── authApi.js          ← Authentication (login, register, logout)
├── userApi.js          ← User CRUD (profile, avatar, password)
├── movieApi.js         ← Movie CRUD (search, favorites, comments)
├── categoryApi.js      ← Category/Genre operations
├── paymentApi.js       ← Payment & VIP upgrade
├── notificationApi.js  ← Notifications
├── uploadApi.js        ← File upload operations
└── index.js            ← Export all APIs
```

---

## 🔧 CÁCH SỬ DỤNG

### **Import API:**

```javascript
// Import từng API riêng lẻ
import { authApi } from "./services/api";
import { userApi } from "./services/api";
import { movieApi } from "./services/api";

// Hoặc import tất cả
import { authApi, userApi, movieApi, paymentApi } from "./services/api";
```

### **Ví dụ sử dụng:**

#### **1. Authentication:**
```javascript
// Login
const response = await authApi.login({ email, password });

// Register
const response = await authApi.register({ name, email, password });

// Logout
await authApi.logout();
```

#### **2. User Operations:**
```javascript
// Get profile
const profile = await userApi.getProfile();

// Update profile
await userApi.updateProfile({ name, email });

// Upload avatar
const avatarUrl = await userApi.uploadAvatar(file);

// Change password
await userApi.changePassword(oldPassword, newPassword);
```

#### **3. Movie Operations:**
```javascript
// Get all movies
const movies = await movieApi.getAllMovies({ page: 1, limit: 20 });

// Search movies
const results = await movieApi.searchMovies("Avengers");

// Get movie by ID
const movie = await movieApi.getMovieById(123);

// Add to favorites
await movieApi.addToFavorites(movieId);

// Get favorites
const favorites = await movieApi.getFavoriteMovies();

// Rate movie
await movieApi.rateMovie(movieId, 5);
```

#### **4. Payment:**
```javascript
// Get VIP plans
const plans = await paymentApi.getVIPPlans();

// Upgrade to VIP
await paymentApi.upgradeToVIP({ planId: "6-months" });

// Get balance
const balance = await paymentApi.getBalance();

// Create recharge order
await paymentApi.createRechargeOrder({ amount: 100000, method: "bank" });
```

#### **5. Upload:**
```javascript
// Upload single file
const fileUrl = await uploadApi.uploadFile(file);

// Upload multiple files
const urls = await uploadApi.uploadMultipleFiles([file1, file2]);

// Delete file
await uploadApi.deleteFile(fileUrl);
```

---

## ✅ ĐẶC ĐIỂM

### **1. Optional Chaining đúng cú pháp:**
```javascript
// ✅ ĐÚNG (không có khoảng trắng)
data.data?.avatarUrl

// ❌ SAI (có khoảng trắng)
data.data ? .avatarUrl
```

### **2. Error handling tự động:**
```javascript
try {
    const data = await userApi.uploadAvatar(file);
    console.log(data); // Avatar URL
} catch (error) {
    console.error(error.message); // Lỗi đã được xử lý
}
```

### **3. Token tự động:**
- Tất cả API calls tự động thêm `Authorization: Bearer token`
- Token lấy từ `localStorage.getItem("token")`

### **4. Type-safe:**
- Tất cả functions đều có JSDoc comments
- IDE sẽ gợi ý parameters và return types

---

## 📝 API ENDPOINTS

### **Auth:**
- `POST /auth/login` - Login
- `POST /auth/register` - Register
- `POST /auth/logout` - Logout
- `POST /auth/refresh-token` - Refresh token
- `POST /auth/verify-email` - Verify email
- `POST /auth/forgot-password` - Forgot password
- `POST /auth/reset-password` - Reset password

### **User:**
- `GET /users/profile` - Get profile
- `PUT /users/profile` - Update profile
- `POST /users/change-password` - Change password
- `POST /users/upload-avatar` - Upload avatar
- `DELETE /users/avatar` - Delete avatar
- `GET /users/:id` - Get user by ID
- `GET /users` - Get all users (admin)

### **Movie:**
- `GET /movies` - Get all movies
- `GET /movies/:id` - Get movie by ID
- `GET /movies/search` - Search movies
- `GET /movies/trending` - Get trending movies
- `GET /movies/top-week` - Get top movies of week
- `GET /movies/category/:id` - Get movies by category
- `GET /movies/:id/comments` - Get comments
- `POST /movies/:id/comments` - Add comment
- `POST /movies/:id/rate` - Rate movie
- `POST /movies/:id/favorite` - Add to favorites
- `DELETE /movies/:id/favorite` - Remove from favorites
- `GET /movies/favorites` - Get favorites
- `POST /movies/:id/watchlist` - Add to watchlist
- `GET /movies/watchlist` - Get watchlist
- `GET /movies/history` - Get watch history
- `POST /movies/:id/progress` - Update watch progress

### **Payment:**
- `GET /payments/methods` - Get payment methods
- `POST /payments/recharge` - Create recharge order
- `POST /payments/upgrade-vip` - Upgrade to VIP
- `GET /payments/balance` - Get balance
- `GET /payments/transactions` - Get transaction history
- `POST /payments/verify` - Verify payment
- `GET /payments/vip-plans` - Get VIP plans
- `POST /payments/cancel-vip` - Cancel VIP

### **Category:**
- `GET /categories` - Get all categories
- `GET /categories/:id` - Get category by ID
- `POST /categories` - Create category (admin)
- `PUT /categories/:id` - Update category (admin)
- `DELETE /categories/:id` - Delete category (admin)

### **Notification:**
- `GET /notifications` - Get all notifications
- `GET /notifications/unread` - Get unread notifications
- `PUT /notifications/:id/read` - Mark as read
- `PUT /notifications/mark-all-read` - Mark all as read
- `DELETE /notifications/:id` - Delete notification
- `DELETE /notifications` - Delete all notifications
- `GET /notifications/settings` - Get settings
- `PUT /notifications/settings` - Update settings

### **Upload:**
- `POST /upload/single` - Upload single file
- `POST /upload/multiple` - Upload multiple files
- `DELETE /upload/delete` - Delete file

---

## 🚀 MIGRATION GUIDE

### **Trước đây:**
```javascript
const response = await fetch("http://localhost:5000/api/users/profile", {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});
const data = await response.json();
```

### **Bây giờ:**
```javascript
const data = await userApi.getProfile();
```

**Đơn giản hơn nhiều! 🎉**

---

## ⚠️ LƯU Ý

1. **Base URL:** Đảm bảo backend đang chạy ở `http://localhost:8080/api/v1`
2. **Token:** Phải có token trong localStorage để call các API cần authentication
3. **Error:** Tất cả errors đều được throw, phải dùng try-catch
4. **uploadService.js:** File này giờ chỉ là wrapper, nên dùng `userApi` hoặc `uploadApi` trực tiếp

---

**Created by AI Assistant - 2025 🤖**

