package com.example.ok1part_spring.repositories;

import com.example.ok1part_spring.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findFirstByUsername(String username);
    User findFirstByEmail(String email);
    User findFirstByEmailAndFkclient(String email, User user);
    List<User> findAllByFkclientOrId(User client, Integer id);
}