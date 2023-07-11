package com.example.ok1part_spring.repositories;

import com.example.ok1part_spring.models.Eform;
import com.example.ok1part_spring.models.Eqlink;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EqlinkRepository extends JpaRepository<Eqlink, Integer> {
    List<Eqlink> findAllByFkforms(Eform form);
}