package com.example.ok1part_spring.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.example.ok1part_spring.models.ReferenceId}
 */
@Data
@NoArgsConstructor
public class ReferenceIdDto implements Serializable {
    String fkfamily;
    String reference;
}