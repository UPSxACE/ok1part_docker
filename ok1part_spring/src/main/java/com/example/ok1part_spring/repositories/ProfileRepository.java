package com.example.ok1part_spring.repositories;

import com.example.ok1part_spring.models.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepository extends JpaRepository<Profile, Integer> {
}