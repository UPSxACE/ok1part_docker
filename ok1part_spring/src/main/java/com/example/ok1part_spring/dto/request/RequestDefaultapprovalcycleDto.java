package com.example.ok1part_spring.dto.request;

import com.example.ok1part_spring.dto.DefaultapprovalcycleDto;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RequestDefaultapprovalcycleDto extends DefaultapprovalcycleDto {
    // dto used ONLY in post/update/delete requests
    String operatorUsername;
}
