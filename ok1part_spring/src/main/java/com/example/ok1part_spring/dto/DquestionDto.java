package com.example.ok1part_spring.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.example.ok1part_spring.models.Dquestion}
 */
@Data
@NoArgsConstructor
public class DquestionDto implements Serializable {
    Integer id;
    EquestionDto fkquestion;
    Integer result;
    String comments;
}