package com.example.ok1part_spring.dto.request;

import com.example.ok1part_spring.dto.DformDto;
import com.example.ok1part_spring.dto.request_json.RequestFormAnswerQuestionJson;
import com.example.ok1part_spring.dto.request_json.objects.FormAnswerValueObject;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RequestDformDto extends DformDto {
    // dto used ONLY in post/update/delete requests
    String shiftName;
    String reasonName;
    Boolean formResult;
    RequestFormAnswerQuestionJson[] formData;

}
