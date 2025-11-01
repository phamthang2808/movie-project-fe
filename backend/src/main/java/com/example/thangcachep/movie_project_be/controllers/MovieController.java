package com.example.thangcachep.movie_project_be.controllers;

import com.example.thangcachep.movie_project_be.entities.MovieEntity;
import com.example.thangcachep.movie_project_be.models.responses.MovieResponse;
import com.example.thangcachep.movie_project_be.services.impl.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/movies")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MovieController {
    
    private final MovieService movieService;
    
    @GetMapping
    public ResponseEntity<Page<MovieResponse>> getAllMovies(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) Long categoryId,
            Pageable pageable
    ) {
        Page<MovieResponse> movies = movieService.getAllMovies(type, categoryId, pageable);
        return ResponseEntity.ok(movies);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<MovieResponse> getMovieById(@PathVariable Long id) {
        MovieResponse movie = movieService.getMovieById(id);
        return ResponseEntity.ok(movie);
    }
    
    @GetMapping("/search")
    public ResponseEntity<Page<MovieResponse>> searchMovies(
            @RequestParam String q,
            Pageable pageable
    ) {
        Page<MovieResponse> movies = movieService.searchMovies(q, pageable);
        return ResponseEntity.ok(movies);
    }
    
    @GetMapping("/trending")
    public ResponseEntity<List<MovieResponse>> getTrendingMovies() {
        List<MovieResponse> movies = movieService.getTrendingMovies();
        return ResponseEntity.ok(movies);
    }
    
    @GetMapping("/top-week")
    public ResponseEntity<List<MovieResponse>> getTopMoviesWeek() {
        List<MovieResponse> movies = movieService.getTopMoviesWeek();
        return ResponseEntity.ok(movies);
    }
    
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<Page<MovieResponse>> getMoviesByCategory(
            @PathVariable Long categoryId,
            Pageable pageable
    ) {
        Page<MovieResponse> movies = movieService.getMoviesByCategory(categoryId, pageable);
        return ResponseEntity.ok(movies);
    }
}


