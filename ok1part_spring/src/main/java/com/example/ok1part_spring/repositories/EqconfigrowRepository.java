package com.example.ok1part_spring.repositories;

import com.example.ok1part_spring.models.Eqconfigrow;
import com.example.ok1part_spring.models.Equestion;
import com.example.ok1part_spring.models.Equestionconfig;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EqconfigrowRepository extends JpaRepository<Eqconfigrow, Integer> {
    List<Eqconfigrow> findAllByFksubquestion(Equestion question);
    List<Eqconfigrow> findAllByFkquestionconfigOrderByOrderFieldAsc(Equestionconfig equestionconfig);
    Eqconfigrow findFirstByFkquestionconfigAndIdField(Equestionconfig equestionconfig, String id_);
}