package com.example.ok1part_spring.dto.request;

import com.example.ok1part_spring.dto.EformDto;
import com.example.ok1part_spring.dto.request_json.RequestQuestionJson;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class RequestEformDto extends EformDto implements Serializable {
    // dto used ONLY in post/update/delete requests
    String familyName;
    String uapName;
    String referenceName;
    RequestQuestionJson[] questions;
}
