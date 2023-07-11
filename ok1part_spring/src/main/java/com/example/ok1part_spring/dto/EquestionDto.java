package com.example.ok1part_spring.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.example.ok1part_spring.models.Equestion}
 */
@Data
@NoArgsConstructor
public class EquestionDto implements Serializable {
    Integer id;
    String idField;
    Integer qorder;
    String label;
    Boolean reasons;
    Integer type;
    Integer continueField;
    Boolean required;
    EquestionconfigDto fkquestionconfig;
    Boolean isSubQuestion;
    Short show_;
}