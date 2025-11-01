package com.example.thangcachep.movie_project_be.repositories;

import com.example.thangcachep.movie_project_be.entities.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    
    Optional<UserEntity> findByEmail(String email);
    
    Boolean existsByEmail(String email);
    
    Page<UserEntity> findByIsActive(Boolean isActive, Pageable pageable);
    
    @Query("SELECT u FROM UserEntity u WHERE u.role.name = :roleName")
    Page<UserEntity> findByRoleName(String roleName, Pageable pageable);
}


