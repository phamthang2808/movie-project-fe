# 📚 POSTMAN API DOCUMENTATION

## Movie Project Backend API

**Base URL:** `http://localhost:8080/api/v1`

---

## 🔐 AUTHENTICATION API

### 1. Register User

**POST** `/auth/register`

**Headers:**

```json
{
  "Content-Type": "application/json",
  "Accept-Language": "vi"
}
```

**Body (JSON):**

```json
{
  "name": "Nguyễn Văn A",
  "email": "user@example.com",
  "password": "123456"
}
```

**Response (201 Created):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Nguyễn Văn A",
    "email": "user@example.com",
    "avatarUrl": null,
    "balance": 0.0,
    "isVip": false,
    "role": {
      "id": 3,
      "name": "USER"
    }
  }
}
```

---

### 2. Login User

**POST** `/auth/login`

**Headers:**

```json
{
  "Content-Type": "application/json",
  "Accept-Language": "vi"
}
```

**Body (JSON):**

```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

**Response (200 OK):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Nguyễn Văn A",
    "email": "user@example.com",
    "avatarUrl": null,
    "balance": 0.0,
    "isVip": false,
    "role": {
      "id": 3,
      "name": "USER"
    }
  }
}
```

---

### 3. Logout

**POST** `/auth/logout`

**Headers:**

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "Accept-Language": "vi"
}
```

**Response (200 OK):**

```json
{}
```

---

## 👤 USER API

### 1. Get Current User Profile

**GET** `/users/profile`

**Headers:**

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "Accept-Language": "vi"
}
```

**Response (200 OK):**

```json
{
  "id": 1,
  "name": "Nguyễn Văn A",
  "email": "user@example.com",
  "avatarUrl": "https://example.com/avatar.jpg",
  "balance": 50000.0,
  "isVip": true,
  "vipExpiredAt": "2025-12-31T00:00:00",
  "role": {
    "id": 3,
    "name": "USER"
  },
  "createdAt": "2024-01-01T00:00:00",
  "updatedAt": "2024-01-01T00:00:00"
}
```

---

### 2. Update User Profile

**PUT** `/users/profile`

**Headers:**

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "Content-Type": "application/json",
  "Accept-Language": "vi"
}
```

**Body (JSON):**

```json
{
  "name": "Nguyễn Văn B",
  "avatarUrl": "https://example.com/new-avatar.jpg"
}
```

**Response (200 OK):**

```json
{
  "id": 1,
  "name": "Nguyễn Văn B",
  "email": "user@example.com",
  "avatarUrl": "https://example.com/new-avatar.jpg",
  "balance": 50000.0,
  "isVip": true,
  "vipExpiredAt": "2025-12-31T00:00:00",
  "role": {
    "id": 3,
    "name": "USER"
  },
  "createdAt": "2024-01-01T00:00:00",
  "updatedAt": "2024-01-15T10:30:00"
}
```

---

### 3. Upload Avatar

**POST** `/users/upload-avatar`

**Headers:**

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "Accept-Language": "vi"
}
```

**Body (Form-data):**

```
Key: avatar | Type: File | Value: [Chọn file ảnh]
```

**Response (200 OK):**

```json
{
  "avatarUrl": "http://localhost:8080/uploads/avatars/123456789.jpg",
  "message": "Upload avatar thành công"
}
```

---

### 4. Delete Avatar

**DELETE** `/users/avatar`

**Headers:**

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "Accept-Language": "vi"
}
```

**Response (200 OK):**

```json
{
  "message": "Xóa avatar thành công"
}
```

---

### 5. Change Password

**POST** `/users/change-password`

**Headers:**

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "Content-Type": "application/json",
  "Accept-Language": "vi"
}
```

**Body (JSON):**

```json
{
  "oldPassword": "123456",
  "newPassword": "newpassword123"
}
```

**Response (200 OK):**

```json
{
  "message": "Đổi mật khẩu thành công"
}
```

---

## 🎬 MOVIE API

### 1. Get All Movies

**GET** `/movies`

**Headers:**

```json
{
  "Content-Type": "application/json",
  "Accept-Language": "vi"
}
```

**Query Parameters:**

```
?page=0&size=20&sort=createdAt,desc
?type=MOVIE
?categoryId=1
```

**Response (200 OK):**

```json
{
  "content": [
    {
      "id": 1,
      "title": "Avatar: The Way of Water",
      "description": "Set more than a decade after the events of the first film...",
      "posterUrl": "https://example.com/avatar2.jpg",
      "backdropUrl": "https://example.com/avatar2-bg.jpg",
      "trailerUrl": "https://youtube.com/watch?v=...",
      "videoUrl": "https://example.com/video.mp4",
      "type": "MOVIE",
      "duration": 192,
      "releaseDate": "2022-12-16",
      "rating": 8.5,
      "ratingCount": 50000,
      "viewCount": 1000000,
      "isVipOnly": false,
      "price": 0.0,
      "isActive": true,
      "categories": [
        {
          "id": 1,
          "name": "Action",
          "description": "Phim hành động"
        }
      ],
      "createdAt": "2024-01-01T00:00:00",
      "updatedAt": "2024-01-01T00:00:00"
    }
  ],
  "totalElements": 100,
  "totalPages": 5,
  "size": 20,
  "number": 0
}
```

---

### 2. Get Movie By ID

**GET** `/movies/{id}`

**Headers:**

```json
{
  "Accept-Language": "vi"
}
```

**Response (200 OK):**

```json
{
  "id": 1,
  "title": "Avatar: The Way of Water",
  "description": "Set more than a decade after the events of the first film...",
  "posterUrl": "https://example.com/avatar2.jpg",
  "backdropUrl": "https://example.com/avatar2-bg.jpg",
  "trailerUrl": "https://youtube.com/watch?v=...",
  "videoUrl": "https://example.com/video.mp4",
  "type": "MOVIE",
  "duration": 192,
  "releaseDate": "2022-12-16",
  "rating": 8.5,
  "ratingCount": 50000,
  "viewCount": 1000000,
  "isVipOnly": false,
  "price": 0.0,
  "isActive": true,
  "categories": [
    {
      "id": 1,
      "name": "Action",
      "description": "Phim hành động"
    }
  ],
  "createdAt": "2024-01-01T00:00:00",
  "updatedAt": "2024-01-01T00:00:00"
}
```

---

### 3. Search Movies

**GET** `/movies/search`

**Headers:**

```json
{
  "Accept-Language": "vi"
}
```

**Query Parameters:**

```
?q=avatar&page=0&size=20
```

**Response (200 OK):**

```json
{
  "content": [
    {
      "id": 1,
      "title": "Avatar: The Way of Water",
      "description": "...",
      "posterUrl": "https://example.com/avatar2.jpg",
      "rating": 8.5,
      "viewCount": 1000000
    }
  ],
  "totalElements": 10,
  "totalPages": 1,
  "size": 20,
  "number": 0
}
```

---

### 4. Get Trending Movies

**GET** `/movies/trending`

**Headers:**

```json
{
  "Accept-Language": "vi"
}
```

**Response (200 OK):**

```json
[
  {
    "id": 1,
    "title": "Avatar: The Way of Water",
    "description": "...",
    "posterUrl": "https://example.com/avatar2.jpg",
    "rating": 8.5,
    "viewCount": 1000000
  },
  {
    "id": 2,
    "title": "Top Gun: Maverick",
    "description": "...",
    "posterUrl": "https://example.com/topgun.jpg",
    "rating": 8.8,
    "viewCount": 800000
  }
]
```

---

### 5. Get Top Movies Week

**GET** `/movies/top-week`

**Headers:**

```json
{
  "Accept-Language": "vi"
}
```

**Response (200 OK):**

```json
[
  {
    "id": 1,
    "title": "Avatar: The Way of Water",
    "description": "...",
    "posterUrl": "https://example.com/avatar2.jpg",
    "rating": 8.5,
    "viewCount": 1000000
  },
  {
    "id": 2,
    "title": "Top Gun: Maverick",
    "description": "...",
    "posterUrl": "https://example.com/topgun.jpg",
    "rating": 8.8,
    "viewCount": 800000
  }
]
```

---

### 6. Get Movies By Category

**GET** `/movies/category/{categoryId}`

**Headers:**

```json
{
  "Accept-Language": "vi"
}
```

**Query Parameters:**

```
?page=0&size=20
```

**Response (200 OK):**

```json
{
  "content": [
    {
      "id": 1,
      "title": "Avatar: The Way of Water",
      "description": "...",
      "posterUrl": "https://example.com/avatar2.jpg",
      "rating": 8.5,
      "viewCount": 1000000,
      "categories": [
        {
          "id": 1,
          "name": "Action"
        }
      ]
    }
  ],
  "totalElements": 50,
  "totalPages": 3,
  "size": 20,
  "number": 0
}
```

---

## 📂 CATEGORY API

### 1. Get All Categories

**GET** `/categories`

**Headers:**

```json
{
  "Accept-Language": "vi"
}
```

**Response (200 OK):**

```json
[
  {
    "id": 1,
    "name": "Action",
    "description": "Phim hành động",
    "imageUrl": "https://example.com/action.jpg",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00",
    "updatedAt": "2024-01-01T00:00:00"
  },
  {
    "id": 2,
    "name": "Comedy",
    "description": "Phim hài",
    "imageUrl": "https://example.com/comedy.jpg",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00",
    "updatedAt": "2024-01-01T00:00:00"
  }
]
```

---

### 2. Get Category By ID

**GET** `/categories/{id}`

**Headers:**

```json
{
  "Accept-Language": "vi"
}
```

**Response (200 OK):**

```json
{
  "id": 1,
  "name": "Action",
  "description": "Phim hành động",
  "imageUrl": "https://example.com/action.jpg",
  "isActive": true,
  "createdAt": "2024-01-01T00:00:00",
  "updatedAt": "2024-01-01T00:00:00"
}
```

---

## ⚠️ ERROR RESPONSES

### 400 Bad Request

```json
{
  "timestamp": "2024-01-15T10:30:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Email không hợp lệ"
    }
  ]
}
```

---

### 401 Unauthorized

```json
{
  "timestamp": "2024-01-15T10:30:00",
  "status": 401,
  "error": "Unauthorized",
  "message": "Token không hợp lệ hoặc đã hết hạn"
}
```

---

### 403 Forbidden

```json
{
  "timestamp": "2024-01-15T10:30:00",
  "status": 403,
  "error": "Forbidden",
  "message": "Không có quyền truy cập"
}
```

---

### 404 Not Found

```json
{
  "timestamp": "2024-01-15T10:30:00",
  "status": 404,
  "error": "Not Found",
  "message": "Không tìm thấy tài nguyên"
}
```

---

### 500 Internal Server Error

```json
{
  "timestamp": "2024-01-15T10:30:00",
  "status": 500,
  "error": "Internal Server Error",
  "message": "Lỗi server nội bộ"
}
```

---

## 📝 NOTES

### Authentication

- Tất cả API trừ `/auth/register` và `/auth/login` đều yêu cầu header `Authorization: Bearer <token>`
- Token được trả về từ API Register hoặc Login
- Token có thời gian hết hạn, cần refresh bằng `/auth/refresh-token`

### Accept-Language Header

- Hỗ trợ: `vi` (Tiếng Việt), `en` (English), `ja` (Japanese), `ko` (Korean)
- Mặc định: `vi` nếu không gửi header này

### Pagination

- API trả về danh sách dạng Page
- Query params: `page` (số trang, bắt đầu từ 0), `size` (số phần tử/trang)
- Response chứa: `content`, `totalElements`, `totalPages`, `size`, `number`

### File Upload

- Chỉ hỗ trợ upload avatar hiện tại
- Định dạng: JPG, PNG, GIF
- Kích thước tối đa: 10MB
- Sử dụng `multipart/form-data`

---

## 🚀 POSTMAN COLLECTION

Import file collection vào Postman:

1. Mở Postman
2. Click **Import** → **File**
3. Chọn file `Movie_Project_API.postman_collection.json`

---

## 🔗 Environment Variables

Tạo Environment trong Postman:

```json
{
  "base_url": "http://localhost:8080/api/v1",
  "token": "",
  "language": "vi"
}
```

Sau khi Login, copy token vào variable `token`.

---

**Tài liệu này được cập nhật:** 2024-01-15
