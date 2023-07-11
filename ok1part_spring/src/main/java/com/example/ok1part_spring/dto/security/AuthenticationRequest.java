package com.example.ok1part_spring.dto.security;

import lombok.Data;

@Data
public class AuthenticationRequest {
    private String login;

    private String password;
}
