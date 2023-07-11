package com.example.ok1part_spring.dto.request_json.objects;

import com.example.ok1part_spring.dto.request_json.objects.child_classes.ComparisonObject;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class OutcomeConfigObject implements Serializable {
    String successMode;
    Boolean endOnFail;
    ComparisonObject[] comparisons;
}
