package com.example.ok1part_spring.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.LinkedHashSet;
import java.util.Set;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "equestion")
public class Equestion {


    public Equestion(String idField, Eform fkform, Integer qorder, String label, Integer type) {
        this.idField = idField;
        this.fkform = fkform;
        this.qorder = qorder;
        this.label = label;
        this.type = type;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "id_", length = 100)
    private String idField;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "fkform", nullable = false)
    private Eform fkform;

    @Column(name = "qorder", nullable = false)
    private Integer qorder;

    @Column(name = "label", nullable = false, length = 1500)
    private String label;

    @Column(name = "reasons")
    private Boolean reasons;

    @Column(name = "type", nullable = false)
    private Integer type;

    @Column(name = "continue_")
    private Integer continueField;

    @Column(name = "required")
    private Boolean required;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fkquestionconfig")
    private Equestionconfig fkquestionconfig;

    @Column(name = "is_sub_question")
    private Boolean isSubQuestion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fkparentquestion")
    private Equestion fkparentquestion;

    @OneToMany(mappedBy = "fkparentquestion")
    private Set<Equestion> equestions = new LinkedHashSet<>();

    @OneToMany(mappedBy = "fkparentquestion")
    private Set<Equestiondep> equestiondepsparent = new LinkedHashSet<>();

    @OneToMany(mappedBy = "fkdepquestion")
    private Set<Equestiondep> equestiondeps = new LinkedHashSet<>();

    @OneToMany(mappedBy = "fkquestion")
    private Set<Equestionreason> equestionreasons = new LinkedHashSet<>();

    @OneToMany(mappedBy = "fkquestion")
    private Set<Equestionvalidationrule> equestionvalidationrules = new LinkedHashSet<>();

    @Column(name = "show_")
    private Short show_;
}