package com.example.ok1part_spring.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.example.ok1part_spring.models.Eform}
 */
@Data
@NoArgsConstructor
public class EformDto implements Serializable {
    Integer id;
    String title;
    String description;
    String dnumber;
    ReferenceDto reference;
    String dapproval;
    String notes;
    UserDto ownerForm; // FIXME - For now it must be manually set in each request
    Integer state;
    String comments;
}