package com.example.ok1part_spring.repositories;

import com.example.ok1part_spring.models.Ereason;
import com.example.ok1part_spring.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EreasonRepository extends JpaRepository<Ereason, Integer> {
    Ereason findFirstByLabelAndFkclient(String label, User clientUser);
    List<Ereason> findAllByFkclient(User clientUser);
}