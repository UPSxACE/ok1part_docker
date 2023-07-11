package com.example.ok1part_spring.repositories;

import com.example.ok1part_spring.models.Equestion;
import com.example.ok1part_spring.models.Equestionvalidationrule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EquestionvalidationruleRepository extends JpaRepository<Equestionvalidationrule, Integer> {
    List<Equestionvalidationrule> findAllByFkquestion(Equestion question);
}