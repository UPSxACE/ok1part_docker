package com.example.ok1part_spring.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "eqlink")
public class Eqlink {
    @Id
    @Column(name = "idlink", nullable = false)
    private Integer id;

    @Column(name = "name_link", nullable = false, length = 45)
    private String nameLink;

    @Column(name = "link", nullable = false, length = 150)
    private String link;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "fkforms", nullable = false)
    private Eform fkforms;

}