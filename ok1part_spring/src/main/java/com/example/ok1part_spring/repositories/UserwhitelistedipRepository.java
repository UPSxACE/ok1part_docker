package com.example.ok1part_spring.repositories;

import com.example.ok1part_spring.models.User;
import com.example.ok1part_spring.models.Userwhitelistedip;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserwhitelistedipRepository extends JpaRepository<Userwhitelistedip, Integer> {
    List<Userwhitelistedip> findAllByFkclient(User client);
    List<Userwhitelistedip> findAllByIp(String ip);
    List<Userwhitelistedip> findAllByFkclientAndIp(User clientUser, String ip);
}