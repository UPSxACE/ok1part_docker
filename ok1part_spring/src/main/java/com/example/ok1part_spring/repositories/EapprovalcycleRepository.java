package com.example.ok1part_spring.repositories;

import com.example.ok1part_spring.models.Eapprovalcycle;
import com.example.ok1part_spring.models.EapprovalcycleId;
import com.example.ok1part_spring.models.Eform;
import com.example.ok1part_spring.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EapprovalcycleRepository extends JpaRepository<Eapprovalcycle, EapprovalcycleId> {
    Eapprovalcycle findFirstByFkformAndFkoperator(Eform form, User operator);

    List<Eapprovalcycle> findAllByFkform(Eform form);
}