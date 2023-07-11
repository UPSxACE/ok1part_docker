package com.example.ok1part_spring.security;

import com.example.ok1part_spring.models.Permission;
import com.example.ok1part_spring.models.User;
import com.example.ok1part_spring.services.PermissionService;
import com.example.ok1part_spring.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class JwtUserDetailsService implements UserDetailsService {
    public static final String ROLE_BACKEND_MANAGMENT = "ROLE_BACKEND_MANAGMENT"; // managing roles, users, config, etc.
    public static final String ROLE_BACKEND_FORMS = "ROLE_BACKEND_FORMS"; // create and edit forms
    public static final String ROLE_BACKEND_APPROVATION = "ROLE_BACKEND_APPROVATION"; // approve forms
    public static final String ROLE_FRONTEND = "ROLE_FRONTEND"; // answer forms(?)

    private final UserService userService;
    private final PermissionService permissionService;

    public JwtUserDetailsService(UserService userService,PermissionService permissionService) {
        this.userService = userService;
        this.permissionService = permissionService;
    }

    @Override
    public JwtUserDetails loadUserByUsername(final String username)
    {
        User user =  this.userService.findByUsername(username);

        if(user == null) throw new BadCredentialsException("usernameOrPassword"); //TODO:Add exception to handler

        ArrayList<GrantedAuthority> roles = new ArrayList<>();

        Permission permission = permissionService.getUserPermissions(user);

        if(permission.getCanFrontend() != null && permission.getCanFrontend()){
            roles.add(new SimpleGrantedAuthority(ROLE_FRONTEND));
        }
        if(permission.getCanForms() != null && permission.getCanForms() ){
            roles.add(new SimpleGrantedAuthority(ROLE_BACKEND_FORMS));
        }
        if(permission.getCanApprovation() != null && permission.getCanApprovation()){
            roles.add(new SimpleGrantedAuthority(ROLE_BACKEND_APPROVATION));
        }
        if(permission.getCanManagement() != null && permission.getCanManagement()){
            roles.add(new SimpleGrantedAuthority(ROLE_BACKEND_MANAGMENT));
        }

        User client_user = user.getFkclient();
        Integer client_id = client_user != null ? client_user.getId() : null;

        return new JwtUserDetails(user.getId(), client_id, user.getUsername(), user.getPassword(), roles);
    }

}
