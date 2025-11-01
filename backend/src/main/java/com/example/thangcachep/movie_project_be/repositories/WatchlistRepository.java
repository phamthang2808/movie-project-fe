package com.example.thangcachep.movie_project_be.repositories;

import com.example.thangcachep.movie_project_be.entities.WatchlistEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WatchlistRepository extends JpaRepository<WatchlistEntity, Long> {
    
    Optional<WatchlistEntity> findByMovieIdAndUserId(Long movieId, Long userId);
    
    Boolean existsByMovieIdAndUserId(Long movieId, Long userId);
    
    Page<WatchlistEntity> findByUserId(Long userId, Pageable pageable);
}


