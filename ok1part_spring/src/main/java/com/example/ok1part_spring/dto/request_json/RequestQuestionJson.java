package com.example.ok1part_spring.dto.request_json;

import com.example.ok1part_spring.dto.request_json.objects.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class RequestQuestionJson implements Serializable {
    String id_;
    String showQuestion;
    String label;
    String type;
    Boolean required;
    ValidationTypeObject[] rules;
    FieldConfigObject fieldConfig;
    OutcomeConfigObject outcomeConfig;
    WorkflowConfigObject workflowConfig;
    DependencyObject[] deps; //

}
