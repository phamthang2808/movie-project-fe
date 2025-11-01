package com.example.thangcachep.movie_project_be.entities;

import java.time.LocalDateTime;

import jakarta.persistence.*;

/**
 * Entity cho bảng Reports
 * Lưu trữ các báo cáo/báo cáo từ người dùng
 */
@Entity
@Table(name = "reports")
public class ReportEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
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
    
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @Column(nullable = false)
    private LocalDateTime updatedAt;
    
    // Constructors
    public Report() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public User getUser() {
        return user;
    }
    
    public void setUser(User user) {
        this.user = user;
    }
    
    public Movie getMovie() {
        return movie;
    }
    
    public void setMovie(Movie movie) {
        this.movie = movie;
    }
    
    public Comment getComment() {
        return comment;
    }
    
    public void setComment(Comment comment) {
        this.comment = comment;
    }
    
    public ReportType getType() {
        return type;
    }
    
    public void setType(ReportType type) {
        this.type = type;
    }
    
    public String getReason() {
        return reason;
    }
    
    public void setReason(String reason) {
        this.reason = reason;
    }
    
    public ReportStatus getStatus() {
        return status;
    }
    
    public void setStatus(ReportStatus status) {
        this.status = status;
    }
    
    public String getStaffNote() {
        return staffNote;
    }
    
    public void setStaffNote(String staffNote) {
        this.staffNote = staffNote;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
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

