package com.example.ok1part_spring.dto.request;

import com.example.ok1part_spring.dto.UapDto;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.example.ok1part_spring.models.Family}
 */
@Data
@NoArgsConstructor
public class RequestUapDto extends UapDto implements Serializable {
    // dto used ONLY in post/update/delete requests
    String new_name;
    String new_description;
}