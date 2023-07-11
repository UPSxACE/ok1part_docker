package com.example.ok1part_spring.repositories;

import com.example.ok1part_spring.models.Uap;
import com.example.ok1part_spring.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UapRepository extends JpaRepository<Uap, Integer> {
    List<Uap> findAllByFkClient(Integer clientId);
    Uap findFirstByNameAndFkClient(String name, Integer userId);
}