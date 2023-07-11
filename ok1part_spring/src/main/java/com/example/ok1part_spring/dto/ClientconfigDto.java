package com.example.ok1part_spring.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.example.ok1part_spring.models.Clientconfig}
 */
@Data
@NoArgsConstructor
public class ClientconfigDto implements Serializable {
    Integer id;
    String subdomain;
    String companyNumber;
    String companyStreet;
    String companyStreet2;
    String companyCity;
    String companyRegion;
    String companyPostal;
    String companyCountry;
    String companyPhone;
    String companyName;
    String companyLogo;
    String companyColor;
    String companyEmail;
}