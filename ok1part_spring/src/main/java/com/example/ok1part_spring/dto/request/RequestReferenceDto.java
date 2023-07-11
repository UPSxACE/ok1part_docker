package com.example.ok1part_spring.dto.request;

import com.example.ok1part_spring.dto.FamilyDto;
import com.example.ok1part_spring.dto.ReferenceDto;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.example.ok1part_spring.models.Family}
 */
@Data
@NoArgsConstructor
public class RequestReferenceDto extends ReferenceDto implements Serializable {
    // dto used ONLY in post/update/delete requests
    String familyName;
    String familyUap;
    String uapName;
    String referenceName;
    String new_description;
}