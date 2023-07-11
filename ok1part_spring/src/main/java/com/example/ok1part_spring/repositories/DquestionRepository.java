package com.example.ok1part_spring.repositories;

import com.example.ok1part_spring.models.Dquestion;
import com.example.ok1part_spring.models.Equestion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DquestionRepository extends JpaRepository<Dquestion, Integer> {
    List<Dquestion> findAllByFkquestion(Equestion question);
}