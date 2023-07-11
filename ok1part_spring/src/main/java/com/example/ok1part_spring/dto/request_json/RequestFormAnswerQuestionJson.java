package com.example.ok1part_spring.dto.request_json;

import com.example.ok1part_spring.dto.request_json.objects.FormAnswerValueObject;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class RequestFormAnswerQuestionJson implements Serializable {
    String id;
    String typeofQuestion;
    Boolean result;
    FormAnswerValueObject value;
}
