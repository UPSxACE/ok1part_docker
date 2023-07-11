package com.example.ok1part_spring.dto.request_json.objects.child_classes;

import com.example.ok1part_spring.dto.request_json.objects.child_classes.grand_childs.ComparisonConfigObject;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class ComparisonObject implements Serializable {
    String comparisonType;
    ComparisonConfigObject comparisonConfig;
}


