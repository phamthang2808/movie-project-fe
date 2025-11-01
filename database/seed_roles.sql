-- ==========================================
-- SEED DATA: ROLES
-- ==========================================
-- File này chứa SQL script để insert dữ liệu roles mặc định
-- Chạy script này NẾU bạn muốn insert thủ công thay vì dùng DataInitializer
-- ==========================================

USE movie_project;

-- Xóa dữ liệu cũ (cẩn thận!)
-- TRUNCATE TABLE roles;

-- Insert roles mặc định
INSERT INTO roles (name, description, is_active, created_at, updated_at) 
VALUES 
    ('ADMIN', 'Quản trị viên - Toàn quyền hệ thống', TRUE, NOW(), NOW()),
    ('STAFF', 'Nhân viên - Quản lý nội dung phim', TRUE, NOW(), NOW()),
    ('USER', 'Người dùng - Khách hàng xem phim', TRUE, NOW(), NOW())
ON DUPLICATE KEY UPDATE 
    description = VALUES(description),
    is_active = TRUE,
    updated_at = NOW();

-- Kiểm tra dữ liệu đã insert
SELECT * FROM roles ORDER BY id;

