package com.example.ok1part_spring.repositories;

import com.example.ok1part_spring.models.Family;
import com.example.ok1part_spring.models.Uap;
import com.example.ok1part_spring.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FamilyRepository extends JpaRepository<Family, String> {
    Family findFirstByFamilyAndFkuap(String family, Uap uap);
    List<Family> findAllByFkuap(Uap uap);
}