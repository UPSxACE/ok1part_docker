package com.example.ok1part_spring.dto.request_json.objects.child_classes;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class DependencyComparisonObject implements Serializable {
    String type;
    Object secondaryValue; // can be number or string
    Object comparisonValue; // can be number or string
}
