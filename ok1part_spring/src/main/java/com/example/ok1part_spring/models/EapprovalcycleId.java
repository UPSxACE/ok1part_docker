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
public class EapprovalcycleId implements Serializable {
    private static final long serialVersionUID = -7442384495548754731L;
    @Column(name = "fkform", nullable = false)
    private Integer fkform;

    @Column(name = "fkoperator", nullable = false)
    private Integer fkoperator;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        EapprovalcycleId entity = (EapprovalcycleId) o;
        return Objects.equals(this.fkform, entity.fkform) &&
                Objects.equals(this.fkoperator, entity.fkoperator);
    }

    @Override
    public int hashCode() {
        return Objects.hash(fkform, fkoperator);
    }

}