package com.example.ok1part_spring.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "clientconfig")
public class Clientconfig {
    @Id
    @Column(name = "fkuser", nullable = false)
    private Integer id;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "fkuser", nullable = false)
    private User user;

    @Column(name = "subdomain")
    private String subdomain;

    @Column(name = "company_number")
    private String companyNumber;

    @Column(name = "company_street")
    private String companyStreet;

    @Column(name = "company_street2")
    private String companyStreet2;

    @Column(name = "company_city", length = 100)
    private String companyCity;

    @Column(name = "company_region", length = 100)
    private String companyRegion;

    @Column(name = "company_postal", length = 10)
    private String companyPostal;

    @Column(name = "company_country", length = 100)
    private String companyCountry;

    @Column(name = "company_phone", length = 20)
    private String companyPhone;

    @Column(name = "company_name", length = 150)
    private String companyName;

    @Column(name = "company_logo", length = 50)
    private String companyLogo;

    @Column(name = "company_color")
    private String companyColor;

    @Column(name = "company_email")
    private String companyEmail;

    /*
    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "fkuser", nullable = false)
    private User user1;
    */

}