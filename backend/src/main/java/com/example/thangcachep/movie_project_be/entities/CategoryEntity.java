package com.example.thangcachep.movie_project_be.entities;

import java.util.HashSet;
import java.util.Set;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Entity cho bảng Categories
 * Lưu trữ các thể loại phim: Hành động, Tình cảm, Kinh dị, ...
 */
@Entity
@Table(name = "categories")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryEntity extends BaseEntity {

    @Column(nullable = false, unique = true, length = 100)
    private String name;

    @Column(length = 500)
    private String description;

    @Column(length = 500)
    private String imageUrl;

    @Column(nullable = false)
    private Boolean isActive = true;

    // Relationships
    @ManyToMany(mappedBy = "categories")
    private Set<MovieEntity> movies = new HashSet<>();
}
