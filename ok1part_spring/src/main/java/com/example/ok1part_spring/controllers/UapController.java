package com.example.ok1part_spring.controllers;

import com.example.ok1part_spring.dto.EformDto;
import com.example.ok1part_spring.dto.UapDto;
import com.example.ok1part_spring.dto.request.RequestUapDto;
import com.example.ok1part_spring.models.Eform;
import com.example.ok1part_spring.models.Uap;
import com.example.ok1part_spring.models.User;
import com.example.ok1part_spring.services.UapService;
import com.example.ok1part_spring.services.UserService;
import com.example.ok1part_spring.utils.Identity;
import jakarta.servlet.http.HttpServletRequest;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.example.ok1part_spring.security.JwtUserDetailsService.ROLE_BACKEND_MANAGMENT;

@RestController
@RequestMapping("/uap")
@CrossOrigin(origins = "*")
public class UapController {
    private final UapService uapService;
    private final UserService userService;
    private final Identity identity;

    @Autowired
    public UapController(UapService uapService, UserService userService, Identity identity){
        this.uapService = uapService;
        this.userService = userService;
        this.identity = identity;
    }

    private User _getDomainOwner(String subdomain){
        return userService.findBySubdomain(subdomain);
    }

    @GetMapping("/all")
    public ResponseEntity<List<UapDto>> getAll(HttpServletRequest request, @RequestParam(value = "name", required = false) String name){
        User clientUser = identity.getClientUserOrClientFromIp(request);
        if(clientUser == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        Uap uapSearch = new Uap();
        uapSearch.setName(name);

        List<Uap> uapResults = uapService.searchUap(clientUser, uapSearch);

        ModelMapper modelMapper = new ModelMapper();
        List<UapDto> uapResultsDto = uapResults.stream().map(
                        form -> modelMapper.map(form, UapDto.class))
                .toList();

        return new ResponseEntity<>(uapResultsDto, HttpStatus.OK);
    }

    // expects body with: name
    @PostMapping("/register-uap")
    @Secured(ROLE_BACKEND_MANAGMENT)
    public ResponseEntity<UapDto> registerUap(@RequestBody UapDto body) {
        User user = identity.getUserModel();

        String name = body.getName();

        if(name == null){
            return new  ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Uap newUap = uapService.registerUapByUser(name, user);

        ModelMapper modelMapper = new ModelMapper();
        UapDto newUapDto = modelMapper.map(newUap, UapDto.class);

        return new  ResponseEntity<>(newUapDto, HttpStatus.OK);
    }

    // expects body with: name, new_name?, new_description?;
    @PatchMapping("/update-uap")
    @Secured(ROLE_BACKEND_MANAGMENT)
    public ResponseEntity<UapDto> updateUap(@RequestBody RequestUapDto body) {
        User user = identity.getUserModel();

        String name = body.getName();
        String newName = body.getNew_name();
        String newDescription = body.getNew_description();

        Uap uap = null;

        if(name != null && newDescription != null){
            uap = uapService.updateDescriptionByNameAndUser(name, newDescription, user);
        }

        if(name != null && newName != null){
            uap = uapService.updateNameByNameAndUser(name, newName, user);
        }

        if(uap == null){
            // if (uap == null), it should mean one of those:
            // 1 - The user didn't send a body with the field 'name'
            // 2 - The user sent a body with neither 'newName' nor 'newDescription'
            // 3 - The user sent a body with at least one of the two, 'newName' or 'newDescription', and 'name',
            // but one of the methods from the uapService returned null, so probably the 'name' was wrong.

            if(name == null){
                return new  ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }

            return new  ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        ModelMapper modelMapper = new ModelMapper();
        UapDto newUapDto = modelMapper.map(uap, UapDto.class);

        return new ResponseEntity<>(newUapDto, HttpStatus.OK);
    }
}
