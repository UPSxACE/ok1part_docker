package com.example.ok1part_spring.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.io.Serializable;
import java.util.Set;

/**
 * DTO for {@link com.example.ok1part_spring.models.Dform}
 */
@Data
@NoArgsConstructor
public class DformDto implements Serializable {
    Integer id;
    UserDto fkopreply;
    String opreply;
    String dcreation;
    String dvalidation;
    EformDto fkform;
    ShiftDto fkshift;
    EreasonDto fkreason;
    Integer result;
    String comments;
    Integer removed;
    Set<DquestionDto> dquestions;
}