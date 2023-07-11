package com.example.ok1part_spring.repositories;

import com.example.ok1part_spring.models.Family;
import com.example.ok1part_spring.models.Reference;
import com.example.ok1part_spring.models.ReferenceId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReferenceRepository extends JpaRepository<Reference, ReferenceId> {
    List<Reference> findByFkfamily(Family family);
}