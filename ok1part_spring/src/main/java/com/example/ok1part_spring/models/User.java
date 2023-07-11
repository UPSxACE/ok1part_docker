package com.example.ok1part_spring.models;

import com.example.ok1part_spring.dto.PermissionDto;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

/*@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor*/
@Getter
@Setter
@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "username", nullable = false, length = 100)
    private String username;

    @Column(name = "email")
    private String email;

    @Column(name = "password", nullable = false, length = 100)
    private String password;

    @Column(name = "account_type", nullable = false)
    private Short accountType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fkclient")
    private User fkclient;

    @Column(name = "disabled")
    private Boolean disabled;

    /*
    @OneToOne(mappedBy = "user")
    private Clientconfig clientconfig;
    */


    /* FIXME - This might cause problems */
    @OneToOne(mappedBy = "user")
    private Profile profile;

    /* FIXME - This might cause problems */
    @OneToOne(mappedBy = "user")
    private Permission permissions;

    @OneToMany(mappedBy = "fkclient")
    private Set<User> users = new LinkedHashSet<>();


}