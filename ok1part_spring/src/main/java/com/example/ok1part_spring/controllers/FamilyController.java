package com.example.ok1part_spring.controllers;

import com.example.ok1part_spring.dto.FamilyDto;
import com.example.ok1part_spring.dto.UapDto;
import com.example.ok1part_spring.dto.request.RequestFamilyDto;
import com.example.ok1part_spring.models.Family;
import com.example.ok1part_spring.models.Uap;
import com.example.ok1part_spring.models.User;
import com.example.ok1part_spring.services.FamilyService;
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

import static com.example.ok1part_spring.security.JwtUserDetailsService.ROLE_BACKEND_FORMS;
import static com.example.ok1part_spring.security.JwtUserDetailsService.ROLE_BACKEND_MANAGMENT;

@RestController
@RequestMapping("/family")
@CrossOrigin(origins = "*")
public class FamilyController {

    private final FamilyService familyService;
    private final UapService uapService;
    private final UserService userService;
    private final Identity identity;

    @Autowired
    public FamilyController(FamilyService familyService, UapService uapService, UserService userService,
                            Identity identity){
        this.familyService = familyService;
        this.uapService = uapService;
        this.userService = userService;
        this.identity = identity;
    }

    private User _getDomainOwner(String subdomain){
        return userService.findBySubdomain(subdomain);
    }

    @GetMapping("/all")
    public ResponseEntity<List<FamilyDto>> getAll(HttpServletRequest request, @RequestParam(value = "uap", required = false) String uapName,
                                                  @RequestParam(value = "family", required = false) String familyName){
        User clientUser = identity.getClientUserOrClientFromIp(request);
        if(clientUser == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        Uap uapSearch = uapService.findUapByUser(uapName, clientUser);

        Family familySearch = new Family();

        if(uapSearch != null){
            //FIXME - THIS IS NOT PROPERLY FILTERING
            familySearch.setFkuap(uapSearch);
        }

        familySearch.setFamily(familyName);

        List<Family> familyResults = familyService.searchFamily(clientUser, familySearch);

        ModelMapper modelMapper = new ModelMapper();
        List<FamilyDto> familyResultsDto = familyResults.stream().map(
                        family -> modelMapper.map(family, FamilyDto.class))
                .toList();

        return new ResponseEntity<>(familyResultsDto, HttpStatus.OK);
    }

    // expects body with: uapName, familyName
    @PostMapping("/create")
    @Secured(ROLE_BACKEND_MANAGMENT)
    public ResponseEntity<FamilyDto> create(@RequestBody RequestFamilyDto body) {
        User user = identity.getUserModel();

        String uapName = body.getUapName();
        String familyName = body.getFamilyName();

        if(uapName == null || familyName == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Family newFamily = familyService.createFamilyByUapNameAndUser(uapName, familyName, user);

        if(newFamily == null){
            // if (family == null) then MOST LIKELY the uap wasn't found
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        ModelMapper modelMapper = new ModelMapper();
        FamilyDto newFamilyDto = modelMapper.map(newFamily, FamilyDto.class);

        return new ResponseEntity<>(newFamilyDto, HttpStatus.OK);
    }

    // expects body with: uapName, familyName, new_description;
    @PatchMapping("/update-description")
    @Secured(ROLE_BACKEND_MANAGMENT)
    public ResponseEntity<FamilyDto> updateDescription(@RequestBody RequestFamilyDto body) {
        User user = identity.getUserModel();

        String uapName = body.getUapName();
        String familyName = body.getFamilyName();
        String newDescription = body.getNew_description();

        if(uapName == null || familyName == null || newDescription == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Family updatedFamily = familyService.updateDescriptionByUapNameAndFamilyNameAndUser(uapName, familyName, newDescription, user);

        if(updatedFamily == null){
            // if (updatedFamily == null) then MOST LIKELY the uap or family wasn't found
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        ModelMapper modelMapper = new ModelMapper();
        FamilyDto updatedFamilyDto = modelMapper.map(updatedFamily, FamilyDto.class);

        return new ResponseEntity<>(updatedFamilyDto, HttpStatus.OK);
    }
}
