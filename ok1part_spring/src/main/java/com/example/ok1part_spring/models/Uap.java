package com.example.ok1part_spring.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "uap")
public class Uap {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "uap", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false, length = 20)
    private String name;

    @Column(name = "description", length = 150)
    private String description;

    @Column(name = "date_creation")
    private Instant dateCreation;

    @Column(name = "date_update")
    private Instant dateUpdate;

    @Column(name = "fkclient", nullable = false)
    private Integer fkClient;

    /*
    @OneToMany(mappedBy = "fkuap")
    private Set<Family> families = new LinkedHashSet<>();
    */
}