# Backend API Documentation

## Cấu trúc Project

```
backend/
├── src/main/java/com/example/thangcachep/movie_project_be/
│   ├── config/              # Configuration classes
│   │   └── SecurityConfig.java
│   ├── controllers/         # REST Controllers
│   │   ├── AuthController.java
│   │   ├── UserController.java
│   │   ├── MovieController.java
│   │   └── CategoryController.java
│   ├── dto/                 # Data Transfer Objects
│   │   ├── request/
│   │   │   ├── LoginRequest.java
│   │   │   └── RegisterRequest.java
│   │   └── response/
│   │       ├── AuthResponse.java
│   │       ├── UserResponse.java
│   │       ├── MovieResponse.java
│   │       └── CategoryResponse.java
│   ├── entities/            # JPA Entities (đã có trong database/)
│   ├── exceptions/          # Exception Handling
│   │   ├── ErrorResponse.java
│   │   └── GlobalExceptionHandler.java
│   ├── filters/             # Security Filters
│   │   └── JwtAuthenticationFilter.java
│   ├── repositories/        # JPA Repositories
│   │   ├── UserRepository.java
│   │   ├── RoleRepository.java
│   │   ├── MovieRepository.java
│   │   └── ...
│   ├── services/            # Business Logic
│   │   ├── AuthService.java
│   │   ├── UserService.java
│   │   ├── MovieService.java
│   │   ├── CategoryService.java
│   │   ├── JwtService.java
│   │   └── CustomUserDetailsService.java
│   └── MovieProjectBeApplication.java
├── src/main/resources/
│   └── application.properties
└── pom.xml
```

## Cài đặt và Chạy

### 1. Yêu cầu:
- Java 17+
- Maven 3.6+
- MySQL 8.0+

### 2. Cấu hình Database:
Sửa file `application.properties`:
```properties
spring.datasource.username=root
spring.datasource.password=your_password
```

### 3. Chạy SQL Schema:
```bash
mysql -u root -p < database/schema.sql
```

### 4. Build và Run:
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Server sẽ chạy tại: `http://localhost:8080`

## API Endpoints

### Authentication (`/api/v1/auth`)
- `POST /register` - Đăng ký
- `POST /login` - Đăng nhập
- `POST /logout` - Đăng xuất

### Users (`/api/v1/users`)
- `GET /profile` - Lấy thông tin profile (cần auth)
- `PUT /profile` - Cập nhật profile (cần auth)

### Movies (`/api/v1/movies`)
- `GET /` - Lấy danh sách phim
- `GET /{id}` - Lấy chi tiết phim
- `GET /search?q=keyword` - Tìm kiếm phim
- `GET /trending` - Phim trending
- `GET /top-week` - Top phim tuần
- `GET /category/{id}` - Phim theo thể loại

### Categories (`/api/v1/categories`)
- `GET /` - Lấy tất cả thể loại
- `GET /{id}` - Lấy chi tiết thể loại

## Security

- JWT Authentication
- Role-based access control (ADMIN, STAFF, USER)
- Password encryption với BCrypt
- CORS enabled cho frontend

## Notes

- Copy các Entity files từ `database/entities/` vào `backend/src/main/java/com/example/thangcachep/movie_project_be/entities/`
- Đảm bảo package name đúng: `com.example.thangcachep.movie_project_be.entities`


