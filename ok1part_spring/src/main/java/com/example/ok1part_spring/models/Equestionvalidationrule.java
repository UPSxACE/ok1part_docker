package com.example.ok1part_spring.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "equestionvalidationrules")
public class Equestionvalidationrule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "fkquestion", nullable = false)
    private Equestion fkquestion;

    @Column(name = "rule_type", nullable = false)
    private Integer ruleType;

    @Column(name = "rule_value", length = 150)
    private String ruleValue;

    @Column(name = "rule_secondary_value", length = 150)
    private String ruleSecondaryValue;

    @Column(name = "message", length = 150)
    private String message;

}