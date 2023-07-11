package com.example.ok1part_spring.services;

import com.example.ok1part_spring.dto.request_json.RequestFormAnswerQuestionJson;
import com.example.ok1part_spring.models.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface DformService {
    List<Dform> findAllByForm(Eform form);
    List<Dform> findAllByUser(User user);
    Dform answerForm(Eform form, RequestFormAnswerQuestionJson[] answers, User requestingUser, Shift shift, Ereason reason, Boolean formResult);
}
