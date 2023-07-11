package com.example.ok1part_spring.controllers;

import com.example.ok1part_spring.dto.security.AuthenticationRequest;
import com.example.ok1part_spring.dto.security.AuthenticationResponse;
import com.example.ok1part_spring.dto.security.RegistrationRequest;
import com.example.ok1part_spring.models.User;
import com.example.ok1part_spring.security.JwtUserDetails;
import com.example.ok1part_spring.security.JwtUserDetailsService;
import com.example.ok1part_spring.security.JwtUserTokenService;
import com.example.ok1part_spring.security.UserAuthenticationManager;
import com.example.ok1part_spring.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    private final UserAuthenticationManager userAuthenticationManager;

    private final JwtUserDetailsService jwtUserDetailsService;

    private final JwtUserTokenService jwtUserTokenService;
    private final UserService userService;


    @Autowired
    public AuthController(UserAuthenticationManager userAuthenticationManager,
                          JwtUserDetailsService jwtUserDetailsService, JwtUserTokenService jwtUserTokenService,
                          UserService userService, PasswordEncoder passwordEncoder) {
        this.userAuthenticationManager = userAuthenticationManager;
        this.jwtUserDetailsService = jwtUserDetailsService;
        this.jwtUserTokenService = jwtUserTokenService;
        this.userService = userService;
    }

    @GetMapping("/test-ip")
    public ResponseEntity testip(HttpServletRequest request){
        return new ResponseEntity<>(request.getAttribute("request_ip"), HttpStatus.OK);
    }

    @PostMapping("/login")
    public AuthenticationResponse authenticate(@RequestBody final AuthenticationRequest authenticationRequest) //TODO: add something equivalent to Jakarta @Valid
    {
        userAuthenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getLogin(), authenticationRequest.getPassword()));
        final JwtUserDetails jwtUserDetails = jwtUserDetailsService.loadUserByUsername(authenticationRequest.getLogin());

        final AuthenticationResponse authenticationResponse = new AuthenticationResponse();
        authenticationResponse.setAccessToken(jwtUserTokenService.generateToken(jwtUserDetails));
        return authenticationResponse;
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody final RegistrationRequest body){
        String username = body.getUsername();
        String email = body.getEmail();
        String password = body.getPassword();
        String client_username = body.getClient_username();
        String company_name = body.getCompany_name();

        if(username == null || password == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        User user;

        if(client_username != null){
            user = userService.registerUserByClientUsername(username, email, password, client_username);
        } else {
            if(company_name == null){
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            user = userService.registerClient(username, email, password, company_name);
        }

        if(user == null){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
