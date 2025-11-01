package com.example.thangcachep.movie_project_be.repositories;

import com.example.thangcachep.movie_project_be.entities.FavoriteEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FavoriteRepository extends JpaRepository<FavoriteEntity, Long> {
    
    Optional<FavoriteEntity> findByMovieIdAndUserId(Long movieId, Long userId);
    
    Boolean existsByMovieIdAndUserId(Long movieId, Long userId);
    
    Page<FavoriteEntity> findByUserId(Long userId, Pageable pageable);
}


