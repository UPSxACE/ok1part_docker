package com.example.ok1part_spring.utils;

import com.example.ok1part_spring.models.Permission;
import com.example.ok1part_spring.models.User;
import com.example.ok1part_spring.models.Userwhitelistedip;
import com.example.ok1part_spring.repositories.UserRepository;
import com.example.ok1part_spring.security.JwtUserDetails;
import com.example.ok1part_spring.services.ClientconfigService;
import com.example.ok1part_spring.services.PermissionService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class Identity {
    private final UserRepository userRepository;
    private final PermissionService permissionService;
    private final ClientconfigService clientconfigService;

    @Autowired
    public Identity(UserRepository userRepository, PermissionService permissionService,
                    ClientconfigService clientconfigService) {
        this.userRepository = userRepository;

        this.permissionService = permissionService;
        this.clientconfigService = clientconfigService;
    }

    public Integer getUserId()
    {
        JwtUserDetails auth_client = (JwtUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return auth_client.getId();
    }

    public User getUserModel(){
        if(SecurityContextHolder.getContext().getAuthentication().getPrincipal() == "anonymousUser"){
            return null;
        }
        JwtUserDetails auth_client = (JwtUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Optional<User> userModel = userRepository.findById(auth_client.getId());
        return userModel.orElse(null);
    }

    public User getClientFromUser(User user){
        if(user == null) return null;

        User parentUser = user.getFkclient();
        if(parentUser == null){
            return user;
        }

        return parentUser;
    }

    public User getClientUserOrClientFromIp(HttpServletRequest request){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(principal == "anonymousUser"){
            List<User> clients = getClientsWhereWhitelisted(request);
            if(clients.isEmpty()){
                return null;
            }
            return clients.get(0);
        }
        JwtUserDetails auth_client = (JwtUserDetails) principal;
        Optional<User> userModel = userRepository.findById(auth_client.getId());
        return userModel.orElse(null);
    }

    public Permission getUserPermissions(){
        User user = getUserModel();
        return permissionService.getUserPermissions(user);
    }

    public List<User> getClientsWhereWhitelisted(HttpServletRequest request){
        String ip = (String) request.getAttribute("request_ip");
        if(ip == null){
            return null;
        }
        return clientconfigService.getWhitelistedClientsByIp(ip);
    }
}
