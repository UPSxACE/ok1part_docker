package com.example.ok1part_spring.security;

import com.example.ok1part_spring.exceptions.TokenInvalidException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtRequestUserFilter extends OncePerRequestFilter {

    private final JwtUserTokenService jwtUserTokenService;

    private final JwtUserDetailsService jwtUserDetailsService;

    @Autowired
    public JwtRequestUserFilter(JwtUserTokenService jwtUserTokenService, JwtUserDetailsService jwtUserDetailsService) {
        this.jwtUserTokenService = jwtUserTokenService;
        this.jwtUserDetailsService = jwtUserDetailsService;
    }

    @Override
    protected void doFilterInternal(final HttpServletRequest request, final HttpServletResponse response,
                                    final FilterChain chain) throws TokenInvalidException, ServletException, IOException {
        // look for Bearer auth header
        final String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (header == null || !header.startsWith("Bearer "))
        {
            chain.doFilter(request, response);
            //throw new TokenInvalidException("Token invalid");
            return;
        }

        final String token = header.substring(7);
        final String username = jwtUserTokenService.validateTokenAndGetUsername(token);
        if (username == null)
        {
            // validation failed or token expired
            chain.doFilter(request, response);
            return;
        }
        // set user details on spring security context
        final JwtUserDetails jwtUserDetails = jwtUserDetailsService.loadUserByUsername(username);
        final UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                jwtUserDetails, jwtUserDetails.getPassword(), jwtUserDetails.getAuthorities());
        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // continue with authenticated user
        chain.doFilter(request, response);
    }
}
