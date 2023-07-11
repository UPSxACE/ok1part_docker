package com.example.ok1part_spring.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "dquestionvalue")
public class Dquestionvalue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "fkquestion", nullable = false)
    private Dquestion fkquestion;

    @Column(name = "inputed_text", length = 150)
    private String inputedText;

    @Column(name = "inputed_integer")
    private Integer inputedInteger;

    @Column(name = "inputed_decimal", precision = 15, scale = 6)
    private BigDecimal inputedDecimal;

    @Column(name = "inputed_date", length = 13)
    private String inputedDate;

    @Column(name = "inputed_datetime", length = 13)
    private String inputedDatetime;

    @Column(name = "selected_toggle_value")
    private Boolean selectedToggleValue;

    @Column(name = "selected_slider_value", precision = 15, scale = 6)
    private BigDecimal selectedSliderValue;

    @Column(name = "checkbox_ischecked")
    private Boolean checkboxIschecked;

    @Column(name = "grid_ischecked")
    private Boolean gridIschecked;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fkselectedoption")
    private Eqconfigoption fkselectedoption;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fkcol")
    private Eqconfigcolumn fkcol;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fkrow")
    private Eqconfigrow fkrow;

}