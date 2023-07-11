package com.example.ok1part_spring.dto.request_json.objects.child_classes;

import com.example.ok1part_spring.dto.request_json.objects.ValidationTypeObject;
import com.example.ok1part_spring.dto.request_json.objects.child_classes.grand_childs.SubFieldConfigObject;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class SubFieldObject implements Serializable {
    String id;
    String label;
    String type;
    ValidationTypeObject rules;
    SubFieldConfigObject fieldConfig;
}
