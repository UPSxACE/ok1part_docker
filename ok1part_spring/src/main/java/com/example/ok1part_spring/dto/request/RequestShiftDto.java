package com.example.ok1part_spring.dto.request;

import com.example.ok1part_spring.dto.ShiftDto;
import com.example.ok1part_spring.dto.UserDto;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RequestShiftDto extends ShiftDto {
    // dto used ONLY in post/update/delete requests
    String shiftName;
    String new_name;
    String new_description;
    String new_shift_start;
    String new_shift_end;
}

