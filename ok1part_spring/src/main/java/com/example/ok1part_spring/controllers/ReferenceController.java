package com.example.ok1part_spring.controllers;

import com.example.ok1part_spring.dto.EformDto;
import com.example.ok1part_spring.dto.FamilyDto;
import com.example.ok1part_spring.dto.ReferenceDto;
import com.example.ok1part_spring.dto.ShiftDto;
import com.example.ok1part_spring.dto.request.RequestFamilyDto;
import com.example.ok1part_spring.dto.request.RequestReferenceDto;
import com.example.ok1part_spring.models.Family;
import com.example.ok1part_spring.models.Reference;
import com.example.ok1part_spring.models.Uap;
import com.example.ok1part_spring.models.User;
import com.example.ok1part_spring.services.FamilyService;
import com.example.ok1part_spring.services.ReferenceService;
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
import java.util.stream.Collectors;

import static com.example.ok1part_spring.security.JwtUserDetailsService.ROLE_BACKEND_MANAGMENT;

@RestController
@RequestMapping("/reference")
@CrossOrigin(origins = "*")
public class ReferenceController {
    private final ReferenceService referenceService;
    private final UserService userService;
    private final UapService uapService;
    private final FamilyService familyService;
    private final Identity identity;

    @Autowired
    public ReferenceController(ReferenceService referenceService, UserService userService, UapService uapService,
                               FamilyService familyService, Identity identity){
        this.referenceService = referenceService;
        this.userService = userService;
        this.uapService = uapService;
        this.familyService = familyService;
        this.identity = identity;
    }

    private User _getDomainOwner(String subdomain){
        return userService.findBySubdomain(subdomain);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ReferenceDto>> getReferences(HttpServletRequest request, @RequestParam (value = "uap", required = false) String uap, @RequestParam(value = "family", required = false) String family){
        User clientUser = identity.getClientUserOrClientFromIp(request);
        if(clientUser == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        List<Reference> references = referenceService.getAllReferencesByUser(clientUser);

        ModelMapper modelMapper = new ModelMapper();
        List<ReferenceDto> referencesDto = references.stream().map(
                        reference -> modelMapper.map(reference, ReferenceDto.class))
                .toList();

        return new ResponseEntity<>(referencesDto, HttpStatus.OK);

        /* FIXME - re-implement the filters later
        if(uap == null || family == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Uap uapModel = uapService.findUapByUser(uap, user);

        if(uapModel == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Family familyModel = familyService.findFamilyByUap(family, uapModel);

        if(familyModel == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        List<Reference> referencesFromFamily = referenceService.getAllReferencesByFamily(familyModel);

        ModelMapper modelMapper = new ModelMapper();
        List<ReferenceDto> referencesFromFamilyDto = referencesFromFamily.stream().map(
                        reference -> modelMapper.map(reference, ReferenceDto.class))
                .toList();

        return new ResponseEntity<>(referencesFromFamilyDto, HttpStatus.OK);
        */
    }

    // expects body with: uapName, familyName, referenceName
    @PostMapping("/create")
    @Secured(ROLE_BACKEND_MANAGMENT)
    public ResponseEntity<ReferenceDto> create(@RequestBody RequestReferenceDto body) {
        User user = identity.getUserModel();

        String uapName = body.getUapName();
        String familyName = body.getFamilyName();
        String referenceName = body.getReferenceName();

        if(uapName == null || familyName == null || referenceName == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Reference newReference = referenceService.createReferenceByUapNameAndFamilyNameAndUser(uapName, familyName, referenceName, user);

        if(newReference == null){
            // if (newReference == null) then MOST LIKELY the uap or family wasn't found
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        ModelMapper modelMapper = new ModelMapper();
        ReferenceDto newReferenceDto = modelMapper.map(newReference, ReferenceDto.class);

        return new ResponseEntity<>(newReferenceDto, HttpStatus.OK);
    }

    // expects body with: uapName, familyName, referenceName, new_description
    @PatchMapping("/update-description")
    @Secured(ROLE_BACKEND_MANAGMENT)
    public ResponseEntity<ReferenceDto> updateDescription(@RequestBody RequestReferenceDto body) {
        User user = identity.getUserModel();

        String uapName = body.getUapName();
        String familyName = body.getFamilyName();
        String referenceName = body.getReferenceName();
        String newDescription = body.getNew_description();

        if(uapName == null || familyName == null || referenceName == null || newDescription == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Reference updatedReference = referenceService.updateReferenceDescriptionByUapNameAndFamilyNameAndUser(uapName, familyName, referenceName, newDescription, user);

        if(updatedReference == null){
            // if (updatedReference == null) then MOST LIKELY the uap, family or reference wasn't found
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        ModelMapper modelMapper = new ModelMapper();
        ReferenceDto updatedReferenceDto = modelMapper.map(updatedReference, ReferenceDto.class);

        return new ResponseEntity<>(updatedReferenceDto, HttpStatus.OK);
    }
}
