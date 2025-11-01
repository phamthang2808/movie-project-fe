package com.example.thangcachep.movie_project_be.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MovieResponse {
    
    private Long id;
    private String title;
    private String description;
    private String posterUrl;
    private String backdropUrl;
    private String trailerUrl;
    private String videoUrl;
    private String type; // MOVIE, SERIES
    private Integer duration;
    private LocalDate releaseDate;
    private Double rating;
    private Integer ratingCount;
    private Integer viewCount;
    private Boolean isVipOnly;
    private Double price;
    private Boolean isActive;
    private List<String> categories;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}


