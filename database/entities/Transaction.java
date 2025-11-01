package com.example.thangcachep.movie_project_be.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Entity cho bảng Transactions
 * Lưu trữ các giao dịch thanh toán: nạp tiền, mua VIP, mua phim
 */
@Entity
@Table(name = "transactions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TransactionEntity extends BaseEntity {
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private TransactionType type;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private TransactionStatus status = TransactionStatus.PENDING;
    
    @Column(nullable = false)
    private Double amount;
    
    @Column(length = 255)
    private String description;
    
    @Column(length = 100)
    private String paymentMethod; // VNPAY, BANK_TRANSFER, MOMO
    
    @Column(length = 255)
    private String paymentId; // ID từ payment gateway
    
    @Column(length = 500)
    private String paymentUrl; // URL thanh toán
    
    @Column
    private LocalDateTime completedAt;
    
    // Enums
    public enum TransactionType {
        RECHARGE, // Nạp tiền
        VIP_PURCHASE, // Mua VIP
        MOVIE_PURCHASE // Mua phim
    }
    
    public enum TransactionStatus {
        PENDING, // Đang chờ
        COMPLETED, // Hoàn thành
        FAILED, // Thất bại
        CANCELLED // Đã hủy
    }
}
