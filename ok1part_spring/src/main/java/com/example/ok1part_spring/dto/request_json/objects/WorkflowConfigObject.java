package com.example.ok1part_spring.dto.request_json.objects;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class WorkflowConfigObject implements Serializable {
    Object reason; // can be string or false
}
