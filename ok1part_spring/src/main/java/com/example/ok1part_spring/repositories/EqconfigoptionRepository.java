package com.example.ok1part_spring.repositories;

import com.example.ok1part_spring.models.Eqconfigoption;
import com.example.ok1part_spring.models.Equestionconfig;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EqconfigoptionRepository extends JpaRepository<Eqconfigoption, Integer> {
    List<Eqconfigoption> findAllByFkquestionconfig(Equestionconfig questionConfig);
    List<Eqconfigoption> findAllByFkquestionconfigOrderByOrderFieldAsc(Equestionconfig equestionconfig);
    Eqconfigoption findFirstByFkquestionconfigAndIdField(Equestionconfig equestionconfig, String id_);
}