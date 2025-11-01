package com.example.thangcachep.movie_project_be.repositories;

import com.example.thangcachep.movie_project_be.entities.RatingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RatingRepository extends JpaRepository<RatingEntity, Long> {
    
    Optional<RatingEntity> findByMovieIdAndUserId(Long movieId, Long userId);
    
    Boolean existsByMovieIdAndUserId(Long movieId, Long userId);
}


