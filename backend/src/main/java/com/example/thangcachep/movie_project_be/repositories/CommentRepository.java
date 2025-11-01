package com.example.thangcachep.movie_project_be.repositories;

import com.example.thangcachep.movie_project_be.entities.CommentEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<CommentEntity, Long> {
    
    Page<CommentEntity> findByMovieIdAndIsActive(Long movieId, Boolean isActive, Pageable pageable);
    
    List<CommentEntity> findByMovieIdAndParentIsNullAndIsActive(Long movieId, Boolean isActive);
    
    List<CommentEntity> findByParentId(Long parentId);
}


