package com.example.ok1part_spring.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "eqconfigoption")
public class Eqconfigoption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "id_", length = 100)
    private String idField;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "fkquestionconfig", nullable = false)
    private Equestionconfig fkquestionconfig;

    @Column(name = "option_value", nullable = false, length = 150)
    private String optionValue;

    @Column(name = "is_image")
    private Boolean isImage;

    @Column(name = "`order_`", nullable = false)
    private Integer orderField;

}