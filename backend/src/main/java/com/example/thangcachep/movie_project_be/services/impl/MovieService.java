package com.example.thangcachep.movie_project_be.services.impl;

import com.example.thangcachep.movie_project_be.entities.MovieEntity;
import com.example.thangcachep.movie_project_be.models.responses.MovieResponse;
import com.example.thangcachep.movie_project_be.repositories.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MovieService {
    
    private final MovieRepository movieRepository;
    
    public Page<MovieResponse> getAllMovies(String type, Long categoryId, Pageable pageable) {
        Page<MovieEntity> movies;
        
        if (categoryId != null) {
            movies = movieRepository.findByCategoryId(categoryId, pageable);
        } else if (type != null) {
            MovieEntity.MovieType movieType = MovieEntity.MovieType.valueOf(type.toUpperCase());
            movies = movieRepository.findByType(movieType, pageable);
        } else {
            movies = movieRepository.findByIsActive(true, pageable);
        }
        
        return movies.map(this::mapToMovieResponse);
    }
    
    public MovieResponse getMovieById(Long id) {
        MovieEntity movie = movieRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy phim với ID: " + id));
        return mapToMovieResponse(movie);
    }
    
    public Page<MovieResponse> searchMovies(String keyword, Pageable pageable) {
        Page<MovieEntity> movies = movieRepository.searchMovies(keyword, pageable);
        return movies.map(this::mapToMovieResponse);
    }
    
    public List<MovieResponse> getTrendingMovies() {
        List<MovieEntity> movies = movieRepository.findTopViewedMovies(PageRequest.of(0, 10));
        return movies.stream()
            .map(this::mapToMovieResponse)
            .collect(Collectors.toList());
    }
    
    public List<MovieResponse> getTopMoviesWeek() {
        List<MovieEntity> movies = movieRepository.findTopRatedMovies(PageRequest.of(0, 10));
        return movies.stream()
            .map(this::mapToMovieResponse)
            .collect(Collectors.toList());
    }
    
    public Page<MovieResponse> getMoviesByCategory(Long categoryId, Pageable pageable) {
        Page<MovieEntity> movies = movieRepository.findByCategoryId(categoryId, pageable);
        return movies.map(this::mapToMovieResponse);
    }
    
    private MovieResponse mapToMovieResponse(MovieEntity movie) {
        return MovieResponse.builder()
            .id(movie.getId())
            .title(movie.getTitle())
            .description(movie.getDescription())
            .posterUrl(movie.getPosterUrl())
            .backdropUrl(movie.getBackdropUrl())
            .trailerUrl(movie.getTrailerUrl())
            .videoUrl(movie.getVideoUrl())
            .type(movie.getType().name())
            .duration(movie.getDuration())
            .releaseDate(movie.getReleaseDate())
            .rating(movie.getRating())
            .ratingCount(movie.getRatingCount())
            .viewCount(movie.getViewCount())
            .isVipOnly(movie.getIsVipOnly())
            .price(movie.getPrice())
            .isActive(movie.getIsActive())
            .categories(movie.getCategories().stream()
                .map(c -> c.getName())
                .collect(Collectors.toList()))
            .createdAt(movie.getCreatedAt())
            .updatedAt(movie.getUpdatedAt())
            .build();
    }
}


