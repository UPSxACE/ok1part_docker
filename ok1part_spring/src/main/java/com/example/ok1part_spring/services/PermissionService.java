package com.example.ok1part_spring.services;

import com.example.ok1part_spring.models.Permission;
import com.example.ok1part_spring.models.User;
import org.springframework.stereotype.Service;

@Service
public interface PermissionService {
    Permission getUserPermissions(User user);
}
