package com.example.ok1part_spring.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "eapprovalcycle")
public class Eapprovalcycle {
    @EmbeddedId
    private EapprovalcycleId id;

    @MapsId("fkform")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "fkform", nullable = false)
    private Eform fkform;

    @MapsId("fkoperator")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "fkoperator", nullable = false)
    private User fkoperator;

    @Column(name = "state", nullable = false)
    private Integer state;

}