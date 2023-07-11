package com.example.ok1part_spring.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "defaultapprovalcycle")
public class Defaultapprovalcycle {
    @EmbeddedId
    private DefaultapprovalcycleId id;

    @MapsId("fkclient")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "fkclient", nullable = false)
    private User fkclient;

    @MapsId("fkoperator")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "fkoperator", nullable = false)
    private User fkoperator;

}