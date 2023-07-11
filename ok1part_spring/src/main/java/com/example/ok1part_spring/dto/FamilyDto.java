package com.example.ok1part_spring.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.example.ok1part_spring.models.Family}
 */
@Data
@NoArgsConstructor
public class FamilyDto implements Serializable {
    String family;
    UapDto fkuap;
    String description;
    Integer isenabled;
}