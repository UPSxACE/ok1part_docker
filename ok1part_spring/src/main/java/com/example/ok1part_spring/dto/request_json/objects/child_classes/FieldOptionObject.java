package com.example.ok1part_spring.dto.request_json.objects.child_classes;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class FieldOptionObject implements Serializable {
    String id;
    String label;
}
