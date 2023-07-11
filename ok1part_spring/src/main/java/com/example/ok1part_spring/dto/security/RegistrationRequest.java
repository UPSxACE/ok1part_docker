package com.example.ok1part_spring.dto.security;

import lombok.Data;

@Data
public class RegistrationRequest {
    private String username;
    private String email;
    private String password;
    private String client_username;
    private String company_name;
}
