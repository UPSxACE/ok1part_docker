package com.example.ok1part_spring.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.example.ok1part_spring.models.Eqconfigcolumn}
 */
@Data
@NoArgsConstructor
public class EqconfigcolumnDto implements Serializable {
    Integer id;
    String idField;
    String columnName;
    Integer orderField;
}