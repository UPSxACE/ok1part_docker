package com.example.ok1part_spring.repositories;

import com.example.ok1part_spring.models.Permission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PermissionRepository extends JpaRepository<Permission, Integer> {
}