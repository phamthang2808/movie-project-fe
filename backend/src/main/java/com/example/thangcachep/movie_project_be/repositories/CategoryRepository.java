package com.example.thangcachep.movie_project_be.repositories;

import com.example.thangcachep.movie_project_be.entities.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {
    
    Optional<CategoryEntity> findByName(String name);
    
    Boolean existsByName(String name);
}


