package com.example.thangcachep.movie_project_be.services;

import com.example.thangcachep.movie_project_be.dto.response.CategoryResponse;
import com.example.thangcachep.movie_project_be.entities.CategoryEntity;
import com.example.thangcachep.movie_project_be.repositories.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {
    
    private final CategoryRepository categoryRepository;
    
    public List<CategoryResponse> getAllCategories() {
        List<CategoryEntity> categories = categoryRepository.findAll();
        return categories.stream()
            .map(this::mapToCategoryResponse)
            .collect(Collectors.toList());
    }
    
    public CategoryResponse getCategoryById(Long id) {
        CategoryEntity category = categoryRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy thể loại với ID: " + id));
        return mapToCategoryResponse(category);
    }
    
    private CategoryResponse mapToCategoryResponse(CategoryEntity category) {
        return CategoryResponse.builder()
            .id(category.getId())
            .name(category.getName())
            .description(category.getDescription())
            .imageUrl(category.getImageUrl())
            .isActive(category.getIsActive())
            .createdAt(category.getCreatedAt())
            .updatedAt(category.getUpdatedAt())
            .build();
    }
}


