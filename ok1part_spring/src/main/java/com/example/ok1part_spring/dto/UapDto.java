package com.example.ok1part_spring.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.example.ok1part_spring.models.Uap}
 */
@Data
@NoArgsConstructor
public class UapDto implements Serializable {
    Integer id;
    String name;
    String description;
}