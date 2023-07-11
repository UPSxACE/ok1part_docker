package com.example.ok1part_spring.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "eqconfigoutcome")
public class Eqconfigoutcome {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "comparison_type")
    private Short comparisonType;

    @Column(name = "comparison_value", length = 150)
    private String comparisonValue;

    @Column(name = "comparison_secondary_value", length = 150)
    private String comparisonSecondaryValue;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "fkquestionconfig", nullable = false)
    private Equestionconfig fkquestionconfig;

}