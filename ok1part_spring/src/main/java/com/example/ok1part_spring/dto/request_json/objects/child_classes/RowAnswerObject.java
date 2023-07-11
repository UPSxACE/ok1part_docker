package com.example.ok1part_spring.dto.request_json.objects.child_classes;

import com.example.ok1part_spring.dto.request_json.objects.FormAnswerValueObject;
import com.example.ok1part_spring.dto.request_json.objects.child_classes.grand_childs.ColAnswerObject;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class RowAnswerObject implements Serializable {
    String id;
    FormAnswerValueObject value;
    ColAnswerObject[] cols;
}
