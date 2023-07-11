package com.example.ok1part_spring.dto.request_json.objects.child_classes.grand_childs;

import com.example.ok1part_spring.dto.request_json.objects.FormAnswerValueObject;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class ColAnswerObject implements Serializable {
    String id;
    FormAnswerValueObject value;
}
