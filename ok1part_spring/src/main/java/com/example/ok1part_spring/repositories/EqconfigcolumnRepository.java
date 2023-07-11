package com.example.ok1part_spring.repositories;

import com.example.ok1part_spring.models.Eqconfigcolumn;
import com.example.ok1part_spring.models.Equestion;
import com.example.ok1part_spring.models.Equestionconfig;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EqconfigcolumnRepository extends JpaRepository<Eqconfigcolumn, Integer> {
    List<Eqconfigcolumn> findAllByFksubquestion(Equestion question);
    List<Eqconfigcolumn> findAllByFkquestionconfigOrderByOrderFieldAsc(Equestionconfig equestionconfig);
    Eqconfigcolumn findFirstByFkquestionconfigAndIdField(Equestionconfig equestionconfig, String id_);
    Eqconfigcolumn findFirstByFkquestionconfigAndOrderField(Equestionconfig equestionconfig, Integer positionInColumn);

}