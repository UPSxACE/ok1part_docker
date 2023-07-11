package com.example.ok1part_spring.repositories;

import com.example.ok1part_spring.models.Clientconfig;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientconfigRepository extends JpaRepository<Clientconfig, Integer> {
    Clientconfig findFirstBySubdomain(String subdomain);

}