-- ==========================================
-- DATABASE SCHEMA CHO MOVIE PROJECT
-- Database: MySQL/MariaDB
-- Created: 2025-01-29
-- ==========================================

-- Tạo database (nếu chưa có)
CREATE DATABASE IF NOT EXISTS movie_project CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE movie_project;

-- ==========================================
-- BẢNG ROLES
-- ==========================================
CREATE TABLE roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_name (name),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==========================================
-- BẢNG USERS
-- ==========================================
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    avatar_url VARCHAR(500),
    role_id BIGINT NOT NULL,
    balance DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    is_vip BOOLEAN NOT NULL DEFAULT FALSE,
    vip_expired_at DATETIME,
    is_email_verified BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    INDEX idx_email (email),
    INDEX idx_role_id (role_id),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==========================================
-- BẢNG CATEGORIES
-- ==========================================
CREATE TABLE categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(500),
    image_url VARCHAR(500),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==========================================
-- BẢNG MOVIES
-- ==========================================
CREATE TABLE movies (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    poster_url VARCHAR(500),
    backdrop_url VARCHAR(500),
    trailer_url VARCHAR(500),
    video_url VARCHAR(500),
    type ENUM('MOVIE', 'SERIES') NOT NULL DEFAULT 'MOVIE',
    duration INT NOT NULL COMMENT 'Thời lượng phim (phút)',
    release_date DATE,
    rating DECIMAL(3, 2) NOT NULL DEFAULT 0.00 COMMENT 'Điểm đánh giá trung bình (0-5)',
    rating_count INT NOT NULL DEFAULT 0,
    view_count INT NOT NULL DEFAULT 0,
    is_vip_only BOOLEAN NOT NULL DEFAULT FALSE,
    price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_type (type),
    INDEX idx_rating (rating),
    INDEX idx_view_count (view_count),
    INDEX idx_is_active (is_active),
    INDEX idx_release_date (release_date),
    FULLTEXT idx_title_desc (title, description)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==========================================
-- BẢNG MOVIE_CATEGORIES (Many-to-Many)
-- ==========================================
CREATE TABLE movie_categories (
    movie_id BIGINT NOT NULL,
    category_id BIGINT NOT NULL,
    PRIMARY KEY (movie_id, category_id),
    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
    INDEX idx_movie_id (movie_id),
    INDEX idx_category_id (category_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==========================================
-- BẢNG EPISODES
-- ==========================================
CREATE TABLE episodes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    movie_id BIGINT NOT NULL,
    episode_number INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    video_url VARCHAR(500),
    duration INT NOT NULL COMMENT 'Thời lượng tập (phút)',
    is_vip_only BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
    INDEX idx_movie_id (movie_id),
    INDEX idx_episode_number (episode_number),
    UNIQUE KEY unique_movie_episode (movie_id, episode_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==========================================
-- BẢNG COMMENTS
-- ==========================================
CREATE TABLE comments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    movie_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    parent_id BIGINT COMMENT 'ID comment cha (cho phép reply)',
    like_count INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE SET NULL,
    INDEX idx_movie_id (movie_id),
    INDEX idx_user_id (user_id),
    INDEX idx_parent_id (parent_id),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==========================================
-- BẢNG RATINGS
-- ==========================================
CREATE TABLE ratings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    movie_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    score INT NOT NULL COMMENT 'Điểm đánh giá từ 1-5',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_movie_user_rating (movie_id, user_id),
    INDEX idx_movie_id (movie_id),
    INDEX idx_user_id (user_id),
    INDEX idx_score (score),
    CHECK (score >= 1 AND score <= 5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==========================================
-- BẢNG FAVORITES
-- ==========================================
CREATE TABLE favorites (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    movie_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_movie_user_favorite (movie_id, user_id),
    INDEX idx_movie_id (movie_id),
    INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==========================================
-- BẢNG WATCHLIST
-- ==========================================
CREATE TABLE watchlist (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    movie_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_movie_user_watchlist (movie_id, user_id),
    INDEX idx_movie_id (movie_id),
    INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==========================================
-- BẢNG WATCH_HISTORY
-- ==========================================
CREATE TABLE watch_history (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    movie_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    episode_id BIGINT COMMENT 'NULL nếu là phim lẻ',
    watch_progress INT NOT NULL DEFAULT 0 COMMENT 'Tiến độ xem (giây)',
    total_duration INT NOT NULL COMMENT 'Tổng thời lượng (giây)',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (episode_id) REFERENCES episodes(id) ON DELETE SET NULL,
    INDEX idx_movie_id (movie_id),
    INDEX idx_user_id (user_id),
    INDEX idx_episode_id (episode_id),
    INDEX idx_updated_at (updated_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==========================================
-- BẢNG TRANSACTIONS
-- ==========================================
CREATE TABLE transactions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    type ENUM('RECHARGE', 'VIP_PURCHASE', 'MOVIE_PURCHASE') NOT NULL,
    status ENUM('PENDING', 'COMPLETED', 'FAILED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    amount DECIMAL(10, 2) NOT NULL,
    description VARCHAR(255),
    payment_method VARCHAR(100) COMMENT 'VNPAY, BANK_TRANSFER, MOMO',
    payment_id VARCHAR(255) COMMENT 'ID từ payment gateway',
    payment_url VARCHAR(500) COMMENT 'URL thanh toán',
    completed_at DATETIME,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_type (type),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==========================================
-- BẢNG NOTIFICATIONS
-- ==========================================
CREATE TABLE notifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    type ENUM('SYSTEM', 'PAYMENT', 'MOVIE', 'COMMENT', 'RATING') NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    link VARCHAR(500) COMMENT 'URL để redirect khi click',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_is_read (is_read),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==========================================
-- BẢNG REPORTS
-- ==========================================
CREATE TABLE reports (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    movie_id BIGINT COMMENT 'NULL nếu không phải báo cáo phim',
    comment_id BIGINT COMMENT 'NULL nếu không phải báo cáo comment',
    type ENUM('MOVIE', 'COMMENT', 'USER', 'OTHER') NOT NULL,
    reason TEXT NOT NULL,
    status ENUM('PENDING', 'PROCESSING', 'RESOLVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    staff_note TEXT COMMENT 'Ghi chú từ staff',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE SET NULL,
    FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_movie_id (movie_id),
    INDEX idx_comment_id (comment_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==========================================
-- INSERT DỮ LIỆU MẪU
-- ==========================================

-- Tạo các roles mặc định
INSERT INTO roles (name, description, is_active) VALUES
('ADMIN', 'Quản trị viên - Toàn quyền quản lý hệ thống', TRUE),
('STAFF', 'Nhân viên - Quản lý nội dung và báo cáo', TRUE),
('USER', 'Người dùng - Sử dụng dịch vụ xem phim', TRUE);

-- Tạo user admin mặc định (role_id = 1 cho ADMIN)
INSERT INTO users (email, password, name, role_id, is_email_verified, is_active) 
VALUES ('admin@movieproject.com', '$2a$10$YourHashedPasswordHere', 'Admin', 1, TRUE, TRUE);

-- Tạo một số categories mẫu
INSERT INTO categories (name, description) VALUES
('Hành động', 'Phim hành động đầy kịch tính'),
('Tình cảm', 'Phim tình cảm lãng mạn'),
('Kinh dị', 'Phim kinh dị hồi hộp'),
('Hài', 'Phim hài vui nhộn'),
('Khoa học viễn tưởng', 'Phim khoa học viễn tưởng'),
('Hoạt hình', 'Phim hoạt hình'),
('Tài liệu', 'Phim tài liệu'),
('Giật gân', 'Phim giật gân');

