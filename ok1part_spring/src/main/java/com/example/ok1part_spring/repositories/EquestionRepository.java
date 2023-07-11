package com.example.ok1part_spring.repositories;

import com.example.ok1part_spring.models.Eform;
import com.example.ok1part_spring.models.Equestion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EquestionRepository extends JpaRepository<Equestion, Integer> {
    List<Equestion> findAllByFkformOrderByFkparentquestionDesc(Eform form);
    Equestion findFirstByFkformAndIdField(Eform form, String id_);
}