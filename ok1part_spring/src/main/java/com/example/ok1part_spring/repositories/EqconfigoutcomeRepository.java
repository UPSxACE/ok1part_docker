package com.example.ok1part_spring.repositories;

import com.example.ok1part_spring.models.Eqconfigoutcome;
import com.example.ok1part_spring.models.Equestionconfig;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EqconfigoutcomeRepository extends JpaRepository<Eqconfigoutcome, Integer> {
    List<Eqconfigoutcome> findAllByFkquestionconfig(Equestionconfig questionConfig);
}