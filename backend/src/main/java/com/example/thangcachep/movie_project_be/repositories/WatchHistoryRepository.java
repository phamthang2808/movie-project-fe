package com.example.thangcachep.movie_project_be.repositories;

import com.example.thangcachep.movie_project_be.entities.WatchHistoryEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WatchHistoryRepository extends JpaRepository<WatchHistoryEntity, Long> {
    
    Optional<WatchHistoryEntity> findByMovieIdAndUserId(Long movieId, Long userId);
    
    Optional<WatchHistoryEntity> findByMovieIdAndUserIdAndEpisodeId(Long movieId, Long userId, Long episodeId);
    
    Page<WatchHistoryEntity> findByUserIdOrderByUpdatedAtDesc(Long userId, Pageable pageable);
}


