package com.example.thangcachep.movie_project_be.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Entity cho bảng Reports
 * Lưu trữ các báo cáo/báo cáo từ người dùng
 */
@Entity
@Table(name = "reports")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReportEntity extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "movie_id")
    private MovieEntity movie;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comment_id")
    private CommentEntity comment;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ReportType type;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String reason;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ReportStatus status = ReportStatus.PENDING;

    @Column(columnDefinition = "TEXT")
    private String staffNote; // Ghi chú từ staff

    // Enums
    public enum ReportType {
        MOVIE, // Báo cáo phim
        COMMENT, // Báo cáo bình luận
        USER, // Báo cáo người dùng
        OTHER // Khác
    }

    public enum ReportStatus {
        PENDING, // Đang chờ xử lý
        PROCESSING, // Đang xử lý
        RESOLVED, // Đã xử lý
        REJECTED // Từ chối
    }
}
