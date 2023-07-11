package com.example.ok1part_spring.repositories;

import com.example.ok1part_spring.models.Dform;
import com.example.ok1part_spring.models.Eform;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DformRepository extends JpaRepository<Dform, Integer> {
    List<Dform> findAllByFkform(Eform form);
}