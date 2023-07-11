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
@Table(name = "family")
public class Family {
    @Id
    @Column(name = "family", nullable = false, length = 15)
    private String family;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "fkuap", nullable = false)
    private Uap fkuap;

    @Column(name = "description", length = 150)
    private String description;

    @Column(name = "isenabled")
    private Integer isenabled;

    /*
    @OneToMany(mappedBy = "fkfamily")
    private Set<Reference> references = new LinkedHashSet<>();

     */

}