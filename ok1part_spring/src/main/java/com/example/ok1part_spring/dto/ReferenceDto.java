package com.example.ok1part_spring.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.io.Serializable;
import java.time.Instant;

/**
 * DTO for {@link com.example.ok1part_spring.models.Reference}
 */
@Data
@NoArgsConstructor
public class ReferenceDto implements Serializable {
    ReferenceIdDto id;
    FamilyDto fkfamily;
    String description;
    Integer hasAlert;
    Instant dateCreation;
    Instant dateUpdate;
}