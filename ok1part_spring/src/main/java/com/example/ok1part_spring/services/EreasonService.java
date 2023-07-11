package com.example.ok1part_spring.services;

import com.example.ok1part_spring.models.Ereason;
import com.example.ok1part_spring.models.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface EreasonService {
    List<Ereason> getAllByUser(User requestingUser);
    Ereason findReasonByLabelAndUser(String label, User user);
    Ereason addReasonByUser(String label, User requestingUser);
    Ereason updateReasonLabelByLabelAndUser(String label, String newLabel, User requestingUser);
    Boolean removeReasonByLabelAndUser(String label, User requestingUser);
}
