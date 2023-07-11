package com.example.ok1part_spring.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.example.ok1part_spring.models.Eapprovalcycle}
 */
@Data
@NoArgsConstructor
public class EapprovalcycleDto implements Serializable {
    EformDto fkform;
    UserDto fkoperator;
    Integer state;
}