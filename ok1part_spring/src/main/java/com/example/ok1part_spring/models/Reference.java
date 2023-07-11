package com.example.ok1part_spring.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "reference")
public class Reference {
    @EmbeddedId
    private ReferenceId id;

    @MapsId("fkfamily")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "fkfamily", nullable = false)
    private Family fkfamily;

    @Column(name = "description", length = 150)
    private String description;

    @Column(name = "has_alert")
    private Integer hasAlert;

    @Column(name = "date_creation")
    private Instant dateCreation;

    @Column(name = "date_update")
    private Instant dateUpdate;

}