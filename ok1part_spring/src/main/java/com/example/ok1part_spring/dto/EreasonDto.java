package com.example.ok1part_spring.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.example.ok1part_spring.models.Ereason}
 */
@Data
@NoArgsConstructor
public class EreasonDto implements Serializable {
    Integer id;
    @JsonIgnore
    UserDto fkclient;
    String label;
    Integer state;
}