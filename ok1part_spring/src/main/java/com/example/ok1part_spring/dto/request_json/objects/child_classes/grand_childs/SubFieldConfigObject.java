package com.example.ok1part_spring.dto.request_json.objects.child_classes.grand_childs;

import com.example.ok1part_spring.dto.request_json.objects.child_classes.FieldOptionObject;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class SubFieldConfigObject implements Serializable {
    FieldOptionObject[] options;
    String type; // is this really needed? Probably not
}
