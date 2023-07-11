package com.example.ok1part_spring.dto.request_json.objects;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class ValidationTypeObject implements Serializable {
    String name;
    Object value; // can be string or number
    Object secValue; // can be string or number
    String message;
}
