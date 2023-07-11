package com.example.ok1part_spring.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.example.ok1part_spring.models.Permission}
 */
@Data
@NoArgsConstructor
public class PermissionDto implements Serializable {
    Integer id;
    Boolean canFrontend;
    Boolean canForms;
    Boolean canApprovation;
    Boolean canManagement;
}