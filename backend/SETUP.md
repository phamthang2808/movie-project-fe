# Hướng dẫn Setup Backend

## Bước 1: Copy Entities vào Backend

Copy tất cả các file entities từ `database/entities/` vào `backend/src/main/java/com/example/thangcachep/movie_project_be/entities/`

**Các file cần copy:**
- BaseEntity.java
- RoleEntity.java
- UserEntity.java (đã có UserDetails implementation)
- CategoryEntity.java
- MovieEntity.java
- EpisodeEntity.java
- CommentEntity.java
- RatingEntity.java
- FavoriteEntity.java
- WatchlistEntity.java
- WatchHistoryEntity.java
- TransactionEntity.java
- NotificationEntity.java
- ReportEntity.java

## Bước 2: Cấu hình Database

1. Tạo database MySQL:
```sql
CREATE DATABASE movie_project CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. Chạy schema SQL:
```bash
mysql -u root -p movie_project < database/schema.sql
```

3. Sửa `application.properties`:
```properties
spring.datasource.username=root
spring.datasource.password=your_password
```

## Bước 3: Build và Run

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

## Bước 4: Test API

### Register:
```bash
curl -X POST http://localhost:8080/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "123456"
  }'
```

### Login:
```bash
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "123456"
  }'
```

## Lưu ý

- Đảm bảo Java 17+ đã được cài đặt
- Đảm bảo MySQL đang chạy
- Port mặc định: 8080 (có thể thay đổi trong application.properties)
- JWT secret key nên được thay đổi trong production


