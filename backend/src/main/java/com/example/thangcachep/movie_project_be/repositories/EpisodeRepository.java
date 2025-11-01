package com.example.thangcachep.movie_project_be.repositories;

import com.example.thangcachep.movie_project_be.entities.EpisodeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EpisodeRepository extends JpaRepository<EpisodeEntity, Long> {
    
    List<EpisodeEntity> findByMovieIdOrderByEpisodeNumberAsc(Long movieId);
    
    Optional<EpisodeEntity> findByMovieIdAndEpisodeNumber(Long movieId, Integer episodeNumber);
}


