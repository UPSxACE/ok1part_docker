package com.example.ok1part_spring.dto.request_json.objects;

import com.example.ok1part_spring.dto.request_json.objects.child_classes.DependencyComparisonObject;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class DependencyObject implements Serializable {
    String typeOfCondition;
    Integer questionIndex;
    DependencyComparisonObject comparison;
}
