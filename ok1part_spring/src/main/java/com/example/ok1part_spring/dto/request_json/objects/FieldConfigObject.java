package com.example.ok1part_spring.dto.request_json.objects;

import com.example.ok1part_spring.dto.request_json.objects.child_classes.FieldOptionObject;
import com.example.ok1part_spring.dto.request_json.objects.child_classes.SubFieldObject;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class FieldConfigObject implements Serializable {
    FieldOptionObject[] options;
    Integer scaleStart;
    Integer scaleEnd;
    SubFieldObject[] rows;
    SubFieldObject[] columns;
    String labelStart;
    String labelEnd;
    Boolean showLabel;
    String mode;
    String valueType;

}
