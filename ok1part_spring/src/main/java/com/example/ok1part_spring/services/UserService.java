package com.example.ok1part_spring.services;

import com.example.ok1part_spring.models.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    User findById(int id);
    User findByIdAndUser(int id, User user);
    User findByUsername(String username);
    User findBySubdomain(String subdomain);
    List<User> findAllAvailableOperatorsByUser(User requestingUser);
    List<User> findAllByUser(User requestingUser);
    User registerClient(String username, String email, String password, String company_name);
    User registerUserByClient(String username, String email, String password, User clientUser);

    User registerUserByClientUsername(String username, String email, String password, String client_username);
}
