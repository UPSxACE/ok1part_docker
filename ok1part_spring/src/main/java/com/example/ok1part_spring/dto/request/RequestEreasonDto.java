package com.example.ok1part_spring.dto.request;

import com.example.ok1part_spring.dto.EreasonDto;
import com.example.ok1part_spring.dto.FamilyDto;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class RequestEreasonDto extends EreasonDto implements Serializable {
    // dto used ONLY in post/update/delete requests
    String new_label;
}
