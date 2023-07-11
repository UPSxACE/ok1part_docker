package com.example.ok1part_spring.services;

import com.example.ok1part_spring.models.Defaultapprovalcycle;
import com.example.ok1part_spring.models.Eapprovalcycle;
import com.example.ok1part_spring.models.Eform;
import com.example.ok1part_spring.models.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface DefaultapprovalcycleService {
    List<Defaultapprovalcycle> getAllByUser(User requestingUser);
    Defaultapprovalcycle addOperatorToTheCycleByUsernameAndUser(String username, User requestingUser);
    Boolean removeOperatorFromTheCycleByUsernameAndUser(String username, User requestingUser);

    }
