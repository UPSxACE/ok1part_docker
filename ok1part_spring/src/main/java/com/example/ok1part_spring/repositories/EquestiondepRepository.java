package com.example.ok1part_spring.repositories;

import com.example.ok1part_spring.models.Equestion;
import com.example.ok1part_spring.models.Equestiondep;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EquestiondepRepository extends JpaRepository<Equestiondep, Integer> {
    List<Equestiondep> findAllByFkparentquestion(Equestion question);
    List<Equestiondep> findAllByFkdepquestion(Equestion question);
    List<Equestiondep> findAllByFkdepquestionId(Integer childQuestionId);
}