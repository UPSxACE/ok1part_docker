package com.example.ok1part_spring.services;

import com.example.ok1part_spring.dto.request_json.RequestFormAnswerQuestionJson;
import com.example.ok1part_spring.models.Dform;
import com.example.ok1part_spring.models.Dquestion;
import com.example.ok1part_spring.models.Eform;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface DquestionService {
    Dquestion registerQuestionJson(RequestFormAnswerQuestionJson question, Eform form, Dform formAnswer);
    List<Dquestion> registerQuestionJsonBulk(RequestFormAnswerQuestionJson[] questionsList, Eform form, Dform formAnswer);

}
