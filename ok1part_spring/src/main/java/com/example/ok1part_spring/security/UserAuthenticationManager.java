package com.example.ok1part_spring.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@Primary
public class UserAuthenticationManager implements AuthenticationManager {


    private final JwtUserDetailsService jwtUserDetailsService;


    private final PasswordEncoder passwordEncoder;

    public UserAuthenticationManager(JwtUserDetailsService jwtUserDetailsService, PasswordEncoder passwordEncoder) {
        this.jwtUserDetailsService = jwtUserDetailsService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException
    {
        final JwtUserDetails jwtUserDetails = jwtUserDetailsService.loadUserByUsername(authentication.getName());
        if (!passwordEncoder.matches(authentication.getCredentials().toString(), jwtUserDetails.getPassword())) {
            throw new BadCredentialsException("usernameOrPassword");
        }
        return new UsernamePasswordAuthenticationToken(jwtUserDetails.getUsername(), jwtUserDetails.getPassword(), jwtUserDetails.getAuthorities());
    }
}
