package com.example.ok1part_spring.repositories;

import com.example.ok1part_spring.models.Defaultapprovalcycle;
import com.example.ok1part_spring.models.DefaultapprovalcycleId;
import com.example.ok1part_spring.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DefaultapprovalcycleRepository extends JpaRepository<Defaultapprovalcycle, DefaultapprovalcycleId> {
    List<Defaultapprovalcycle> findAllByFkclient(User clientUser);
    Defaultapprovalcycle findFirstByFkclientAndFkoperator(User client, User operator);
}