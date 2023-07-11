package com.example.ok1part_spring.dto.request;
import com.example.ok1part_spring.dto.UserDto;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.example.ok1part_spring.models.Family}
 */
@Data
@NoArgsConstructor
public class RequestUserDto {
    // dto used ONLY in post/update/delete requests // FIXME - Deprecated?
    String username;
    String email;
    String password;
}
