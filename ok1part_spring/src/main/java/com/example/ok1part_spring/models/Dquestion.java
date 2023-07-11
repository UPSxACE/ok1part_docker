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
@Table(name = "dquestion")
public class Dquestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "fkforms", nullable = false)
    private Dform fkforms;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "fkquestion", nullable = false)
    private Equestion fkquestion;

    @Column(name = "result", nullable = false)
    private Integer result;

    @Column(name = "comments", length = 512)
    private String comments;;

    @OneToMany(mappedBy = "fkquestion")
    private Set<Dquestionvalue> dquestionvalues = new LinkedHashSet<>();

}