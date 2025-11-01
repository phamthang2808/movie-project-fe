package com.example.thangcachep.movie_project_be.entities;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Entity cho bảng Roles
 * Lưu trữ các vai trò trong hệ thống: ADMIN, STAFF, USER
 */
@Entity
@Table(name = "roles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoleEntity extends BaseEntity {
    
    @Column(nullable = false, unique = true, length = 50)
    private String name; // ADMIN, STAFF, USER
    
    @Column(length = 255)
    private String description;
    
    @Column(nullable = false)
    private Boolean isActive = true;
    
    // Relationships
    @OneToMany(mappedBy = "role")
    private Set<UserEntity> users = new HashSet<>();
}


