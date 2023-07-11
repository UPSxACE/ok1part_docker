package com.example.ok1part_spring.configurations;

import com.example.ok1part_spring.security.JwtRequestUserFilter;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;

import static com.example.ok1part_spring.security.JwtUserDetailsService.*;

@Configuration
@EnableGlobalMethodSecurity(securedEnabled = true)
public class JwtSecurityConfig {
    private final JwtRequestUserFilter jwtRequestUserFilter;

    @Autowired
    public JwtSecurityConfig(JwtRequestUserFilter jwtRequestUserFilter) {
        this.jwtRequestUserFilter = jwtRequestUserFilter;
    }

    @Bean
    public SecurityFilterChain configure(final HttpSecurity http)  throws Exception
    {
        return http.csrf(customizer -> customizer.disable()).cors(Customizer.withDefaults())
                .authorizeHttpRequests(authorize -> authorize.requestMatchers("/auth/**").permitAll()
                        .requestMatchers("/eform/**").permitAll()
                        .requestMatchers("/dform/**").permitAll()
                        .requestMatchers("/family/**").permitAll()
                        .requestMatchers("/reason/**").permitAll()
                        .requestMatchers("/reference/**").permitAll()
                        .requestMatchers("/shift/**").permitAll()
                        .requestMatchers("/uap/**").permitAll()
                        .requestMatchers("/approval-cycle/**").hasAuthority(ROLE_BACKEND_MANAGMENT)
                        .requestMatchers("/user/**").hasAuthority(ROLE_BACKEND_MANAGMENT)
                        .requestMatchers("/identity/**").permitAll()
                        .requestMatchers("/client-config/**").hasAuthority(ROLE_BACKEND_MANAGMENT)
                        .anyRequest().denyAll())
                .exceptionHandling(authentication -> authentication.authenticationEntryPoint(new AuthenticationEntryPoint() {
                    @Override
                    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
                        // Set the response status to 401 (Unauthorized)
                        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                        //response.getWriter().write("Unauthorized");
                    }
                }).accessDeniedHandler(new AccessDeniedHandler() {
                    @Override
                    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
                        // Set the response status to 403 (Forbidden)
                        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                        //response.getWriter().write("Access Denied");
                    }
                }))
                .sessionManagement(customizer -> customizer.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtRequestUserFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }




    /* OLD:
    return http.csrf().disable().cors().and()
                .authorizeHttpRequests()
                .requestMatchers("/ClientsAPIPublic/**","/login","/user-openapi/**", "/swagger-ui/**", "/v3/api-docs/**","/index.html").permitAll()
                .requestMatchers("/admin_client/**").hasRole(ROLE_CLIENT).and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .addFilterBefore(jwtRequestUserFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
     */


/*
 @Bean
    public SecurityFilterChain configure(final HttpSecurity http)  throws Exception
    {
        return http
                .authorizeHttpRequests().and().authorizeHttpRequests().anyRequest().permitAll().and()
                .build();
    }
    @Bean
    public SecurityFilterChain configure_backend_approvation(final HttpSecurity http) throws Exception
    {
        return http.cors().and()
                .csrf().disable()
                .authorizeHttpRequests()
                .requestMatchers("/EformApprovationAPI/**").hasRole(ROLE_BACKEND_APPROVATION).and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .addFilterBefore(jwtRequestUserFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
    @Bean
    public SecurityFilterChain configure_backend_managment(final HttpSecurity http) throws Exception
    {
        return http.cors().and()
                .csrf().disable()
                .authorizeHttpRequests()
                .requestMatchers("/backend_managment/**").hasRole(ROLE_BACKEND_MANAGMENT).and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .addFilterBefore(jwtRequestUserFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public SecurityFilterChain configure_frontend(final HttpSecurity http) throws Exception
    {
        return http.cors().and()
                .csrf().disable()
                .authorizeHttpRequests()
                .requestMatchers("/frontend_managment/**").hasRole(ROLE_FRONTEND).and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .addFilterBefore(jwtRequestUserFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }*/
}
