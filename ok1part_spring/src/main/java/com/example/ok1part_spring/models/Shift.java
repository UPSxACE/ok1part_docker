package com.example.ok1part_spring.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "shift")
public class Shift {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "shift", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "fkclient", nullable = false)
    private User fkclient;

    @Column(name = "name", nullable = false, length = 20)
    private String name;

    @Column(name = "description", length = 150)
    private String description;

    @Column(name = "shift_start", length = 13)
    private String shiftStart;

    @Column(name = "shift_end", length = 13)
    private String shiftEnd;

}