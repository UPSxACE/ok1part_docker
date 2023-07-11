package com.example.ok1part_spring.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "ereason")
public class Ereason {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "fkclient", nullable = false)
    private User fkclient;

    @Column(name = "label", nullable = false, length = 150)
    private String label;

    @Column(name = "state", nullable = false)
    private Integer state;

}