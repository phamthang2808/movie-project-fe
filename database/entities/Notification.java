package com.example.thangcachep.movie_project_be.entities;

import com.example.thangcachep.movie_project_be.entities.BaseEntity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Entity cho bảng Notifications
 * Lưu trữ thông báo cho người dùng
 */
@Entity
@Table(name = "notifications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificationEntity extends BaseEntity {
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;
    
    @Column(nullable = false, length = 255)
    private String title;
    
    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private NotificationType type;
    
    @Column(nullable = false)
    private Boolean isRead = false;
    
    @Column(length = 500)
    private String link; // URL để redirect khi click
    
    // Enum
    public enum NotificationType {
        SYSTEM, // Hệ thống
        PAYMENT, // Thanh toán
        MOVIE, // Phim mới
        COMMENT, // Bình luận
        RATING // Đánh giá
    }
}
