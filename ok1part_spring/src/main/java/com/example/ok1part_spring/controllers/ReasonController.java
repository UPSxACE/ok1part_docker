package com.example.ok1part_spring.controllers;

import com.example.ok1part_spring.dto.DefaultapprovalcycleDto;
import com.example.ok1part_spring.dto.EreasonDto;
import com.example.ok1part_spring.dto.FamilyDto;
import com.example.ok1part_spring.dto.UapDto;
import com.example.ok1part_spring.dto.request.RequestEreasonDto;
import com.example.ok1part_spring.models.Defaultapprovalcycle;
import com.example.ok1part_spring.models.Ereason;
import com.example.ok1part_spring.models.Uap;
import com.example.ok1part_spring.models.User;
import com.example.ok1part_spring.services.DefaultapprovalcycleService;
import com.example.ok1part_spring.services.EreasonService;
import com.example.ok1part_spring.services.UserService;
import com.example.ok1part_spring.utils.Identity;
import jakarta.persistence.Id;
import jakarta.servlet.http.HttpServletRequest;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static com.example.ok1part_spring.security.JwtUserDetailsService.ROLE_BACKEND_FORMS;
import static com.example.ok1part_spring.security.JwtUserDetailsService.ROLE_BACKEND_MANAGMENT;

@RestController
@RequestMapping("/reason")
@CrossOrigin(origins = "*")
public class ReasonController {

    private final EreasonService ereasonService;
    private final UserService userService;
    private final Identity identity;

    @Autowired
    public ReasonController(EreasonService ereasonService, UserService userService, Identity identity){
        this.ereasonService = ereasonService;
        this.userService = userService;
        this.identity = identity;
    }

    private User _getDomainOwner(String subdomain){
        return userService.findBySubdomain(subdomain);
    }

    @GetMapping("/all")
    public ResponseEntity<List<EreasonDto>> getAll(HttpServletRequest request){
        User clientUser = identity.getClientUserOrClientFromIp(request);
        if(clientUser == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        List<Ereason> reasonResults = ereasonService.getAllByUser(clientUser);

        ModelMapper modelMapper = new ModelMapper();
        List<EreasonDto> reasonResultsDto = reasonResults.stream().map(
                        reason -> modelMapper.map(reason, EreasonDto.class))
                .toList();

        return new ResponseEntity<>(reasonResultsDto, HttpStatus.OK);
    }

    // expects body: label
    @PostMapping("/create")
    @Secured(ROLE_BACKEND_MANAGMENT)
    public ResponseEntity<EreasonDto> create(@RequestBody Ereason body){
        User user = identity.getUserModel();

        String label = body.getLabel();
        if(label == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Ereason newEreason = ereasonService.addReasonByUser(label,user);

        ModelMapper modelMapper = new ModelMapper();
        EreasonDto newEreasonDto = modelMapper.map(newEreason, EreasonDto.class);

        return new ResponseEntity<>(newEreasonDto, HttpStatus.OK);
    }

    // expects body: label, new_label
    @PatchMapping("/update-label")
    @Secured(ROLE_BACKEND_MANAGMENT)
    public ResponseEntity<EreasonDto> updateLabel(@RequestBody RequestEreasonDto body){
        User user = identity.getUserModel();

        String label = body.getLabel();
        String newLabel = body.getNew_label();
        if(label == null || newLabel == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Ereason updatedReason = ereasonService.updateReasonLabelByLabelAndUser(label, newLabel, user);

        if(updatedReason == null){
            // if (updatedReason == null) then MOST LIKELY reason wasn't found
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        ModelMapper modelMapper = new ModelMapper();
        EreasonDto updatedReasonDto = modelMapper.map(updatedReason, EreasonDto.class);

        return new ResponseEntity<>(updatedReasonDto, HttpStatus.OK);
    }

    // expects body: label
    @DeleteMapping("/delete")
    @Secured(ROLE_BACKEND_MANAGMENT)
    public ResponseEntity<List<EreasonDto>> delete(@RequestBody Ereason body){
        User user = identity.getUserModel();

        String label = body.getLabel();
        if(label == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Boolean wasRemoved = ereasonService.removeReasonByLabelAndUser(label, user);
        if(wasRemoved == null){
            // if (wasRemoved == null) then MOST LIKELY the label wasn't found.
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        List<Ereason> updatedReasonEntries = ereasonService.getAllByUser(user);

        ModelMapper modelMapper = new ModelMapper();
        List<EreasonDto> updatedReasonEntriesDto = updatedReasonEntries.stream().map(
                        reason -> modelMapper.map(reason, EreasonDto.class))
                .collect(Collectors.toList());

        return new ResponseEntity<>(updatedReasonEntriesDto, HttpStatus.OK);
    }
}
