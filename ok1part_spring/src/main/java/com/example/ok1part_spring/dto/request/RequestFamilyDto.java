package com.example.ok1part_spring.dto.request;

import com.example.ok1part_spring.dto.FamilyDto;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.example.ok1part_spring.models.Family}
 */
@Data
@NoArgsConstructor
public class RequestFamilyDto extends FamilyDto implements Serializable {
    // dto used ONLY in post/update/delete requests
    String uapName;
    String familyName;
    String new_description;
}