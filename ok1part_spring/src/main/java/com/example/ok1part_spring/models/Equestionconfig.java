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
@Table(name = "equestionconfig")
public class Equestionconfig {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "options")
    private Boolean options;

    @Column(name = "rows_")
    private Boolean rows;

    @Column(name = "columns_")
    private Boolean columns;

    @Column(name = "scale_start", length = 150)
    private String scaleStart;

    @Column(name = "scale_end", length = 150)
    private String scaleEnd;

    @Column(name = "label_start", length = 150)
    private String labelStart;

    @Column(name = "label_end", length = 150)
    private String labelEnd;

    @Column(name = "show_label")
    private Boolean showLabel;

    @Column(name = "mode")
    private Integer mode;

    @Column(name = "value_type")
    private Integer valueType;

    @Column(name = "outcome_success_mode")
    private Integer outcomeSuccessMode;

    @OneToMany(mappedBy = "fkquestionconfig")
    private Set<Eqconfigcolumn> eqconfigcolumns = new LinkedHashSet<>();

    @OneToMany(mappedBy = "fkquestionconfig")
    private Set<Eqconfigoption> eqconfigoptions = new LinkedHashSet<>();

    @OneToMany(mappedBy = "fkquestionconfig")
    private Set<Eqconfigrow> eqconfigrows = new LinkedHashSet<>();

}