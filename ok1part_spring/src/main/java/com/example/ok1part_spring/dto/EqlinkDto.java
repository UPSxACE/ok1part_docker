package com.example.ok1part_spring.dto;

import com.example.ok1part_spring.models.Eform;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.example.ok1part_spring.models.Eqlink}
 */
@Data
@NoArgsConstructor
public class EqlinkDto implements Serializable {
    Integer id;
    String nameLink;
    String link;
    Eform fkforms;
}