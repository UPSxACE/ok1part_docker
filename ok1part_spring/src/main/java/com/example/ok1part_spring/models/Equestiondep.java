package com.example.ok1part_spring.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "equestiondeps")
public class Equestiondep {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "fkparentquestion", nullable = false)
    private Equestion fkparentquestion;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "fkdepquestion", nullable = false)
    private Equestion fkdepquestion;

    @Column(name = "condition_type", nullable = false)
    private Short conditionType;

    @Column(name = "comparison_type")
    private Short comparisonType;

    @Column(name = "comparison_value", length = 150)
    private String comparisonValue;

    @Column(name = "comparison_secondary_value", length = 150)
    private String comparisonSecondaryValue;

}