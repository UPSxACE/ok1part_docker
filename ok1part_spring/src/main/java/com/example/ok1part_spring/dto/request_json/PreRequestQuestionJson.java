package com.example.ok1part_spring.dto.request_json;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PreRequestQuestionJson extends RequestQuestionJson{
    @JsonIgnore
    Integer id; // will be used to carry around the model ID when necessary, but won't be sent to the user
}
