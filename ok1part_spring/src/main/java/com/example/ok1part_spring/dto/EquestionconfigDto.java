package com.example.ok1part_spring.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.io.Serializable;
import java.util.Set;

/**
 * DTO for {@link com.example.ok1part_spring.models.Equestionconfig}
 */
@Data
@NoArgsConstructor
public class EquestionconfigDto implements Serializable {
    Integer id;
    Boolean options;
    Boolean rows;
    Boolean columns;
    String scaleStart;
    String scaleEnd;
    String labelStart;
    String labelEnd;
    Boolean showLabel;
    Integer mode;
    Integer valueType;
    Integer outcomeSuccessMode;
    Set<EqconfigcolumnDto> eqconfigcolumns;
}