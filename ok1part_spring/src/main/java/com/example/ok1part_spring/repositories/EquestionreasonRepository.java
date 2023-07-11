package com.example.ok1part_spring.repositories;

import com.example.ok1part_spring.models.Equestion;
import com.example.ok1part_spring.models.Equestionreason;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EquestionreasonRepository extends JpaRepository<Equestionreason, Integer> {
    List<Equestionreason> findAllByFkquestion(Equestion equestion);
    Equestionreason findFirstByFkquestion(Equestion question);
}