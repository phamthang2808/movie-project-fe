# 🔧 HƯỚNG DẪN CẤU HÌNH ENVIRONMENT VARIABLES

## 📝 TẠO FILE .env

Tạo file `.env` trong thư mục root của project (cùng cấp với `package.json`) với nội dung sau:

```env
# Google OAuth Configuration
# Lấy Client ID từ: https://console.cloud.google.com/apis/credentials
# Tạo OAuth 2.0 Client ID với redirect URI: http://localhost:5173/auth/google/callback
VITE_GOOGLE_CLIENT_ID=

# Backend API Configuration (optional)
# VITE_API_BASE_URL=http://localhost:8080/api/v1
```

## 🎯 CÁCH ĐIỀN

### **Bước 1: Lấy Google Client ID**

1. Truy cập [Google Cloud Console](https://console.cloud.google.com/)
2. Chọn project của bạn (hoặc tạo mới)
3. Vào **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth client ID**
5. Nếu chưa có, tạo **OAuth consent screen** trước
6. Tạo **OAuth 2.0 Client ID**:
   - **Application type**: Web application
   - **Name**: Movie Project
   - **Authorized redirect URIs**:
     ```
     http://localhost:5173/auth/google/callback
     ```
7. Copy **Client ID** (dạng: `xxxxx.apps.googleusercontent.com`)

### **Bước 2: Điền vào file .env**

Mở file `.env` và điền Client ID vào:

```env
VITE_GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com
```

**Ví dụ:**

```env
VITE_GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
```

## ⚠️ LƯU Ý

- File `.env` đã được thêm vào `.gitignore` để không commit lên Git
- Sau khi thay đổi `.env`, cần **restart dev server** (`npm run dev`)
- KHÔNG commit file `.env` chứa Client ID thật lên Git

## 🧪 TEST

Sau khi điền xong:

1. Restart dev server: `npm run dev`
2. Vào trang `/login` hoặc `/register`
3. Click "Đăng nhập bằng Google" hoặc "Đăng ký bằng Google"
4. Nếu đã config đúng, sẽ redirect đến Google OAuth page

---

**Last Updated:** 2024-01-15
