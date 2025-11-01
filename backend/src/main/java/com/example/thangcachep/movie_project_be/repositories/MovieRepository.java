package com.example.thangcachep.movie_project_be.repositories;

import com.example.thangcachep.movie_project_be.entities.MovieEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<MovieEntity, Long> {
    
    Page<MovieEntity> findByIsActive(Boolean isActive, Pageable pageable);
    
    Page<MovieEntity> findByType(MovieEntity.MovieType type, Pageable pageable);
    
    @Query("SELECT m FROM MovieEntity m WHERE m.isActive = true ORDER BY m.rating DESC")
    List<MovieEntity> findTopRatedMovies(Pageable pageable);
    
    @Query("SELECT m FROM MovieEntity m WHERE m.isActive = true ORDER BY m.viewCount DESC")
    List<MovieEntity> findTopViewedMovies(Pageable pageable);
    
    @Query("SELECT m FROM MovieEntity m WHERE m.isActive = true AND m.releaseDate >= :date ORDER BY m.releaseDate ASC")
    List<MovieEntity> findUpcomingMovies(LocalDate date, Pageable pageable);
    
    @Query("SELECT m FROM MovieEntity m WHERE m.isActive = true AND " +
           "(LOWER(m.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(m.description) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<MovieEntity> searchMovies(String keyword, Pageable pageable);
    
    @Query("SELECT m FROM MovieEntity m JOIN m.categories c WHERE c.id = :categoryId AND m.isActive = true")
    Page<MovieEntity> findByCategoryId(Long categoryId, Pageable pageable);
}


