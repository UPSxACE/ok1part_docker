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
public class ReferenceId implements Serializable {
    private static final long serialVersionUID = 5475237165708723430L;
    @Column(name = "fkfamily", nullable = false, length = 15)
    private String fkfamily;

    @Column(name = "reference", nullable = false, length = 15)
    private String reference;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        ReferenceId entity = (ReferenceId) o;
        return Objects.equals(this.reference, entity.reference) &&
                Objects.equals(this.fkfamily, entity.fkfamily);
    }

    @Override
    public int hashCode() {
        return Objects.hash(reference, fkfamily);
    }

}