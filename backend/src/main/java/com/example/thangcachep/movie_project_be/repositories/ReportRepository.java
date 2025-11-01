package com.example.thangcachep.movie_project_be.repositories;

import com.example.thangcachep.movie_project_be.entities.ReportEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<ReportEntity, Long> {
    
    Page<ReportEntity> findByStatusOrderByCreatedAtDesc(ReportEntity.ReportStatus status, Pageable pageable);
    
    Page<ReportEntity> findByUserId(Long userId, Pageable pageable);
}


