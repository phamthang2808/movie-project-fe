# Backend Environment Variables Setup

## Google OAuth Configuration

Backend cần các environment variables sau để chạy Google OAuth:

### 1. Tạo file `.env` trong thư mục `backend/`

```bash
cd backend
```

Tạo file `.env` với nội dung:

```env
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
GOOGLE_REDIRECT_URI=http://localhost:5173/auth/google/callback
```

**Lấy thông tin từ:**

- Google Cloud Console → APIs & Services → Credentials
- OAuth 2.0 Client ID của bạn

### 2. Hoặc set environment variables trong IDE (IntelliJ/Eclipse)

- IntelliJ: Run → Edit Configurations → Environment variables
- Eclipse: Run Configurations → Environment → New

### 3. Hoặc set trong hệ thống (Windows)

```powershell
$env:GOOGLE_CLIENT_ID="your-google-client-id-here"
$env:GOOGLE_CLIENT_SECRET="your-google-client-secret-here"
$env:GOOGLE_REDIRECT_URI="http://localhost:5173/auth/google/callback"
```

## Lưu ý

- **KHÔNG** commit file `.env` vào git
- `backend/target/` đã được thêm vào `.gitignore` để tránh commit file build
- File `application.yml` không còn hardcode secrets nữa
