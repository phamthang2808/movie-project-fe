# 📊 DATABASE SCHEMA - MOVIE PROJECT

## 📋 Tổng quan

Database schema cho hệ thống xem phim trực tuyến với đầy đủ các tính năng:

- Quản lý người dùng (Admin, Staff, User)
- Quản lý phim và phim bộ
- Đánh giá và bình luận
- Thanh toán và VIP
- Lịch sử xem phim
- Thông báo

## 🗄️ Cấu trúc Database

### **Bảng chính:**

1. **users** - Người dùng
2. **categories** - Thể loại phim
3. **movies** - Phim
4. **episodes** - Tập phim (cho phim bộ)
5. **comments** - Bình luận
6. **ratings** - Đánh giá
7. **favorites** - Phim yêu thích
8. **watchlist** - Danh sách xem sau
9. **watch_history** - Lịch sử xem
10. **transactions** - Giao dịch thanh toán
11. **notifications** - Thông báo
12. **reports** - Báo cáo

### **Bảng trung gian:**

- **movie_categories** - Liên kết nhiều-nhiều giữa Movies và Categories

## 🔗 Mối quan hệ (Relationships)

### **Users (1) → (N)**

- Comments
- Ratings
- Favorites
- Watchlist
- WatchHistory
- Transactions
- Notifications
- Reports

### **Movies (1) → (N)**

- Episodes
- Comments
- Ratings
- Favorites
- Watchlist
- WatchHistory
- Reports

### **Movies (N) ↔ (N) Categories**

- Quan hệ nhiều-nhiều qua bảng `movie_categories`

### **Comments (1) → (N)**

- Comments (parent_id) - Cho phép reply comment

### **Episodes (N) → (1) Movie**

- Mỗi episode thuộc về một movie

### **WatchHistory (N) → (1) Episode**

- Có thể null nếu là phim lẻ

## 📝 Chi tiết các bảng

### **1. users**

```sql
- id: BIGINT (PK, Auto Increment)
- email: VARCHAR(100) UNIQUE
- password: VARCHAR(255)
- name: VARCHAR(100)
- avatar_url: VARCHAR(500)
- role: ENUM('ADMIN', 'STAFF', 'USER')
- balance: DECIMAL(10,2)
- is_vip: BOOLEAN
- vip_expired_at: DATETIME
- is_email_verified: BOOLEAN
- is_active: BOOLEAN
- created_at: DATETIME
- updated_at: DATETIME
```

### **2. categories**

```sql
- id: BIGINT (PK, Auto Increment)
- name: VARCHAR(100) UNIQUE
- description: VARCHAR(500)
- image_url: VARCHAR(500)
- is_active: BOOLEAN
- created_at: DATETIME
- updated_at: DATETIME
```

### **3. movies**

```sql
- id: BIGINT (PK, Auto Increment)
- title: VARCHAR(255)
- description: TEXT
- poster_url: VARCHAR(500)
- backdrop_url: VARCHAR(500)
- trailer_url: VARCHAR(500)
- video_url: VARCHAR(500)
- type: ENUM('MOVIE', 'SERIES')
- duration: INT (phút)
- release_date: DATE
- rating: DECIMAL(3,2) (0-5)
- rating_count: INT
- view_count: INT
- is_vip_only: BOOLEAN
- price: DECIMAL(10,2)
- is_active: BOOLEAN
- created_at: DATETIME
- updated_at: DATETIME
```

### **4. episodes**

```sql
- id: BIGINT (PK, Auto Increment)
- movie_id: BIGINT (FK → movies.id)
- episode_number: INT
- title: VARCHAR(255)
- description: TEXT
- video_url: VARCHAR(500)
- duration: INT (phút)
- is_vip_only: BOOLEAN
- is_active: BOOLEAN
- created_at: DATETIME
- updated_at: DATETIME
UNIQUE(movie_id, episode_number)
```

### **5. comments**

```sql
- id: BIGINT (PK, Auto Increment)
- movie_id: BIGINT (FK → movies.id)
- user_id: BIGINT (FK → users.id)
- content: TEXT
- parent_id: BIGINT (FK → comments.id, nullable)
- like_count: INT
- is_active: BOOLEAN
- created_at: DATETIME
- updated_at: DATETIME
```

### **6. ratings**

```sql
- id: BIGINT (PK, Auto Increment)
- movie_id: BIGINT (FK → movies.id)
- user_id: BIGINT (FK → users.id)
- score: INT (1-5)
- created_at: DATETIME
- updated_at: DATETIME
UNIQUE(movie_id, user_id)
CHECK(score >= 1 AND score <= 5)
```

### **7. favorites**

```sql
- id: BIGINT (PK, Auto Increment)
- movie_id: BIGINT (FK → movies.id)
- user_id: BIGINT (FK → users.id)
- created_at: DATETIME
UNIQUE(movie_id, user_id)
```

### **8. watchlist**

```sql
- id: BIGINT (PK, Auto Increment)
- movie_id: BIGINT (FK → movies.id)
- user_id: BIGINT (FK → users.id)
- created_at: DATETIME
UNIQUE(movie_id, user_id)
```

### **9. watch_history**

```sql
- id: BIGINT (PK, Auto Increment)
- movie_id: BIGINT (FK → movies.id)
- user_id: BIGINT (FK → users.id)
- episode_id: BIGINT (FK → episodes.id, nullable)
- watch_progress: INT (giây)
- total_duration: INT (giây)
- created_at: DATETIME
- updated_at: DATETIME
```

### **10. transactions**

```sql
- id: BIGINT (PK, Auto Increment)
- user_id: BIGINT (FK → users.id)
- type: ENUM('RECHARGE', 'VIP_PURCHASE', 'MOVIE_PURCHASE')
- status: ENUM('PENDING', 'COMPLETED', 'FAILED', 'CANCELLED')
- amount: DECIMAL(10,2)
- description: VARCHAR(255)
- payment_method: VARCHAR(100)
- payment_id: VARCHAR(255)
- payment_url: VARCHAR(500)
- completed_at: DATETIME
- created_at: DATETIME
- updated_at: DATETIME
```

### **11. notifications**

```sql
- id: BIGINT (PK, Auto Increment)
- user_id: BIGINT (FK → users.id)
- title: VARCHAR(255)
- content: TEXT
- type: ENUM('SYSTEM', 'PAYMENT', 'MOVIE', 'COMMENT', 'RATING')
- is_read: BOOLEAN
- link: VARCHAR(500)
- created_at: DATETIME
```

### **12. reports**

```sql
- id: BIGINT (PK, Auto Increment)
- user_id: BIGINT (FK → users.id)
- movie_id: BIGINT (FK → movies.id, nullable)
- comment_id: BIGINT (FK → comments.id, nullable)
- type: ENUM('MOVIE', 'COMMENT', 'USER', 'OTHER')
- reason: TEXT
- status: ENUM('PENDING', 'PROCESSING', 'RESOLVED', 'REJECTED')
- staff_note: TEXT
- created_at: DATETIME
- updated_at: DATETIME
```

## 🔍 Indexes

### **Indexes quan trọng:**

- `users.email` - UNIQUE INDEX
- `users.role` - INDEX
- `movies.type` - INDEX
- `movies.rating` - INDEX
- `movies.view_count` - INDEX
- `movies.title, description` - FULLTEXT INDEX (cho search)
- `ratings(movie_id, user_id)` - UNIQUE INDEX
- `favorites(movie_id, user_id)` - UNIQUE INDEX
- `watchlist(movie_id, user_id)` - UNIQUE INDEX
- `episodes(movie_id, episode_number)` - UNIQUE INDEX

## 🚀 Sử dụng

### **1. Tạo database:**

```bash
mysql -u root -p < database/schema.sql
```

### **2. Sử dụng với JPA/Hibernate:**

Tất cả các Entity classes đã được tạo sẵn trong folder `database/entities/`:

- `User.java`
- `Category.java`
- `Movie.java`
- `Episode.java`
- `Comment.java`
- `Rating.java`
- `Favorite.java`
- `Watchlist.java`
- `WatchHistory.java`
- `Transaction.java`
- `Notification.java`
- `Report.java`

### **3. Cấu hình JPA:**

```properties
# application.properties
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.datasource.url=jdbc:mysql://localhost:3306/movie_project
spring.datasource.username=root
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
```

## 📌 Lưu ý

1. **Password hashing:** Sử dụng BCrypt hoặc Argon2 để hash password
2. **Soft delete:** Có thể thêm trường `deleted_at` cho soft delete nếu cần
3. **Audit trail:** Có thể thêm các trường `created_by`, `updated_by` nếu cần tracking
4. **File storage:** `avatar_url`, `poster_url`, `video_url` có thể lưu trữ trên cloud storage (S3, Cloudinary)
5. **Full-text search:** Đã có FULLTEXT index cho `movies.title` và `movies.description`

## 🔐 Security

- Tất cả password phải được hash
- Email phải được verify trước khi sử dụng
- Role-based access control qua trường `role` trong users
- Transaction status để theo dõi thanh toán

---

**Created:** 2025-01-29  
**Version:** 1.0.0
