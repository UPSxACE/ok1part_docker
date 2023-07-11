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
@Table(name = "dform")
public class Dform {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fkopreply")
    private User fkopreply;

    @Column(name = "opreply", length = 128)
    private String opreply;

    @Column(name = "dcreation", nullable = false, length = 13)
    private String dcreation;

    @Column(name = "dvalidation", length = 13)
    private String dvalidation;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "fkform", nullable = false)
    private Eform fkform;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "fkshift", nullable = false)
    private Shift fkshift;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "fkreason", nullable = false)
    private Ereason fkreason;

    @Column(name = "result", nullable = false)
    private Integer result;

    @Column(name = "comments", length = 512)
    private String comments;

    @Column(name = "removed", nullable = false)
    private Integer removed;

    @OneToMany(mappedBy = "fkforms")
    private Set<Dquestion> dquestions = new LinkedHashSet<>();

}