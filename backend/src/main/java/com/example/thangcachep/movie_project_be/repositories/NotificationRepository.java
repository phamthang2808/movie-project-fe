package com.example.thangcachep.movie_project_be.repositories;

import com.example.thangcachep.movie_project_be.entities.NotificationEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<NotificationEntity, Long> {
    
    Page<NotificationEntity> findByUserIdOrderByCreatedAtDesc(Long userId, Pageable pageable);
    
    List<NotificationEntity> findByUserIdAndIsReadFalse(Long userId);
    
    Long countByUserIdAndIsReadFalse(Long userId);
}


