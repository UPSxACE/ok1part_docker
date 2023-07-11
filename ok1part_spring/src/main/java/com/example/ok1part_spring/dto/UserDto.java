package com.example.ok1part_spring.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.io.Serializable;
import java.time.Instant;
import java.util.Set;

/**
 * DTO for {@link com.example.ok1part_spring.models.User}
 */
@Data
@NoArgsConstructor
public class UserDto implements Serializable {
    Integer id;
    String username;
    String email;
    @JsonIgnore
    String password;
    Short accountType;
    @JsonIgnore
    Integer fkclientId;
    @JsonIgnore
    String fkclientUsername;
    Boolean disabled;
    @JsonIgnore
    Instant dateCreation;
    @JsonIgnore
    Instant dateUpdate;
    @JsonIgnore
    ClientconfigDto clientconfig;
    PermissionDto permissions;
    ProfileDto profile;
}