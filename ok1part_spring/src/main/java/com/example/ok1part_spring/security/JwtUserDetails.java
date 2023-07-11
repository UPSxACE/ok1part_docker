package com.example.ok1part_spring.security;

import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

@Getter
public class JwtUserDetails extends User {
    public final Integer id;
    public final Integer client_id;

    public JwtUserDetails(final Integer id, final Integer client_id, final String username, final String hash,
                          final Collection<? extends GrantedAuthority> authorities){
        super(username, hash, authorities);
        this.id = id;
        this.client_id = client_id;
    }
}
