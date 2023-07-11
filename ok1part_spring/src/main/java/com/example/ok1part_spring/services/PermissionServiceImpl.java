package com.example.ok1part_spring.services;

import com.example.ok1part_spring.models.Permission;
import com.example.ok1part_spring.models.User;
import com.example.ok1part_spring.repositories.PermissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PermissionServiceImpl implements PermissionService{

    private final PermissionRepository permissionRepository;

    @Autowired
    public PermissionServiceImpl(PermissionRepository permissionRepository) {
        this.permissionRepository = permissionRepository;
    }

    public Permission getUserPermissions(User user) {
        Optional<Permission> permission = permissionRepository.findById(user.getId());
        return permission.orElse(null);
    }

}
