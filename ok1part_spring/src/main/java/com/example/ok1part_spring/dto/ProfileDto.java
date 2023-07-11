package com.example.ok1part_spring.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.io.Serializable;
import java.time.Instant;

/**
 * DTO for {@link com.example.ok1part_spring.models.Profile}
 */
@Data
@NoArgsConstructor
public class ProfileDto implements Serializable {
    Integer id;
    String avatarUrl;
    String street;
    String city;
    String region;
    String postal;
    String country;
    String phone;
    String firstName;
    String lastName;
    Instant dateCreation;
    Instant dateUpdate;
}