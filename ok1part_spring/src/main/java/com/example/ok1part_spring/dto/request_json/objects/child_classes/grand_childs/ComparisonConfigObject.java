package com.example.ok1part_spring.dto.request_json.objects.child_classes.grand_childs;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class ComparisonConfigObject implements Serializable {
    Object secondaryValue; // can be string or number
    Object comparisonValue; // can be string or number
}