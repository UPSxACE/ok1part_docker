package com.example.ok1part_spring.controllers;

import com.example.ok1part_spring.dto.misc.PublicInfoDto;
import com.example.ok1part_spring.models.Clientconfig;
import com.example.ok1part_spring.models.Permission;
import com.example.ok1part_spring.models.User;
import com.example.ok1part_spring.repositories.ClientconfigRepository;
import com.example.ok1part_spring.services.PermissionService;
import com.example.ok1part_spring.utils.Identity;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import static com.example.ok1part_spring.security.JwtUserDetailsService.*;

import java.util.Optional;

@RestController
@RequestMapping("/identity")
@CrossOrigin(origins = "*")
public class IdentityController {
    private final Identity identity;
    private final ClientconfigRepository clientconfigRepository;

    public IdentityController(Identity identity,
                              ClientconfigRepository clientconfigRepository) {
        this.identity = identity;
        this.clientconfigRepository = clientconfigRepository;
    }

    @GetMapping("/permissions")
    @Secured(ROLE_FRONTEND)
    public Integer getPermissions(){
        Permission userPermissions = identity.getUserPermissions();
        int bitwise = 0;
        if(userPermissions.getCanFrontend() != null && userPermissions.getCanFrontend()){
            bitwise+=1;
        }
        if(userPermissions.getCanForms() != null && userPermissions.getCanForms()){
            bitwise+=2;
        }
        if(userPermissions.getCanApprovation() != null && userPermissions.getCanApprovation()){
            bitwise+=4;
        }
        if(userPermissions.getCanManagement() != null && userPermissions.getCanManagement()){
            bitwise+=8;
        }
        return bitwise;
    }

    @GetMapping("/public-info")
    public ResponseEntity<PublicInfoDto> getPublicInfo(HttpServletRequest request) {
        User clientUser = identity.getClientUserOrClientFromIp(request);
        if (clientUser == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        Optional<Clientconfig> clientconfig = clientconfigRepository.findById(clientUser.getId());
        if(clientconfig.isPresent()){
            PublicInfoDto publicInfoDto = new PublicInfoDto();
            publicInfoDto.setCompanyName(clientconfig.get().getCompanyName());
            return new ResponseEntity<>(publicInfoDto, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

}
