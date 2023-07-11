package com.example.ok1part_spring.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "permission")
public class Permission {
    @Id
    @Column(name = "fkuser", nullable = false)
    private Integer id;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "fkuser", nullable = false)
    private User user;

    @Column(name = "can_frontend")
    private Boolean canFrontend;

    @Column(name = "can_forms")
    private Boolean canForms;

    @Column(name = "can_approvation")
    private Boolean canApprovation;

    @Column(name = "can_management")
    private Boolean canManagement;

}