package com.example.thangcachep.movie_project_be.repositories;

import com.example.thangcachep.movie_project_be.entities.TransactionEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionRepository extends JpaRepository<TransactionEntity, Long> {
    
    Page<TransactionEntity> findByUserIdOrderByCreatedAtDesc(Long userId, Pageable pageable);
    
    List<TransactionEntity> findByUserIdAndStatus(Long userId, TransactionEntity.TransactionStatus status);
    
    Optional<TransactionEntity> findByPaymentId(String paymentId);
}

