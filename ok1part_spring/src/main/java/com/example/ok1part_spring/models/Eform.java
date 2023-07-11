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
@Table(name = "eform")
public class Eform {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "title", length = 150, nullable = false)
    private String title;

    @Column(name = "description", length = 500)
    private String description;

    @Column(name = "dnumber", length = 20)
    private String dnumber;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumns({
            @JoinColumn(name = "family", referencedColumnName = "fkfamily", nullable = false),
            @JoinColumn(name = "reference", referencedColumnName = "reference", nullable = false)
    })
    private Reference reference;

    @Column(name = "dapproval", length = 13)
    private String dapproval;

    @Column(name = "notes", length = 500)
    private String notes;

    @JoinColumn(name = "owner_form")
    private Integer ownerForm;

    @Column(name = "state", nullable = false)
    private Integer state;

    @Column(name = "comments", length = 15000)
    private String comments;

    @OneToMany(mappedBy = "fkform")
    private Set<Dform> dforms = new LinkedHashSet<>();

    @OneToMany(mappedBy = "fkform")
    private Set<Eapprovalcycle> eapprovalcycles = new LinkedHashSet<>();

    @OneToMany(mappedBy = "fkforms")
    private Set<Eqlink> eqlinks = new LinkedHashSet<>();

    @OneToMany(mappedBy = "fkform")
    private Set<Equestion> equestions = new LinkedHashSet<>();

    /*
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumns({
            @JoinColumn(name = "family", referencedColumnName = "fkfamily", nullable = false),
            @JoinColumn(name = "reference", referencedColumnName = "reference", nullable = false)
    })
    private Reference reference1;
    */

}