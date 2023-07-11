package com.example.ok1part_spring.repositories;

import com.example.ok1part_spring.models.Shift;
import com.example.ok1part_spring.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShiftRepository extends JpaRepository<Shift, Integer> {
    List<Shift> findAllByFkclient(User clientUser);
    Shift findFirstByNameAndFkclient(String name, User clientUser);
}