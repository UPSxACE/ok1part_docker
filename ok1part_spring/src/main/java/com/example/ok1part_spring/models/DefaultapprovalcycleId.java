package com.example.ok1part_spring.models;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.Hibernate;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@Embeddable
public class DefaultapprovalcycleId implements Serializable {
    private static final long serialVersionUID = 1966645173505059307L;
    @Column(name = "fkclient", nullable = false)
    private Integer fkclient;

    @Column(name = "fkoperator", nullable = false)
    private Integer fkoperator;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        DefaultapprovalcycleId entity = (DefaultapprovalcycleId) o;
        return Objects.equals(this.fkclient, entity.fkclient) &&
                Objects.equals(this.fkoperator, entity.fkoperator);
    }

    @Override
    public int hashCode() {
        return Objects.hash(fkclient, fkoperator);
    }

}