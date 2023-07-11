package com.example.ok1part_spring.controllers;

import com.example.ok1part_spring.dto.DefaultapprovalcycleDto;
import com.example.ok1part_spring.dto.EapprovalcycleDto;
import com.example.ok1part_spring.dto.FamilyDto;
import com.example.ok1part_spring.dto.UserDto;
import com.example.ok1part_spring.dto.request.RequestDefaultapprovalcycleDto;
import com.example.ok1part_spring.dto.request.RequestFamilyDto;
import com.example.ok1part_spring.models.Defaultapprovalcycle;
import com.example.ok1part_spring.models.Eapprovalcycle;
import com.example.ok1part_spring.models.Eform;
import com.example.ok1part_spring.models.User;
import com.example.ok1part_spring.services.DefaultapprovalcycleService;
import com.example.ok1part_spring.services.FamilyService;
import com.example.ok1part_spring.services.UserService;
import com.example.ok1part_spring.utils.Identity;
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
@RequestMapping("/approval-cycle")
@CrossOrigin(origins = "*")
public class ApprovalCycleController{
    private final DefaultapprovalcycleService defaultapprovalcycleService;
    private final UserService userService;
    private final Identity identity;

    @Autowired
    public ApprovalCycleController(DefaultapprovalcycleService defaultapprovalcycleService, UserService userService, Identity identity){
        this.defaultapprovalcycleService = defaultapprovalcycleService;
        this.userService = userService;
        this.identity = identity;
    }

    @GetMapping("/default-cycle")
    public ResponseEntity<List<DefaultapprovalcycleDto>> getApprovalCycle(){
        User user = identity.getUserModel();

        List<Defaultapprovalcycle> cycle = defaultapprovalcycleService.getAllByUser(user);

        if(cycle == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        ModelMapper modelMapper = new ModelMapper();
        List<DefaultapprovalcycleDto> cycleDto = cycle.stream().map(
                        cycle_ -> modelMapper.map(cycle_, DefaultapprovalcycleDto.class))
                .toList();

        return new ResponseEntity<>(cycleDto, HttpStatus.OK);
    }

    @GetMapping("/available-operators")
    public ResponseEntity<List<UserDto>> getOperators(){
        User user = identity.getUserModel();

        List<User> operators = userService.findAllAvailableOperatorsByUser(user);


        ModelMapper modelMapper = new ModelMapper();
        List<UserDto> usersDto = operators.stream().map(
                        op -> modelMapper.map(op, UserDto.class))
                .toList();

        return new ResponseEntity<>(usersDto, HttpStatus.OK);

    }

    // expects body with: operatorUsername
    @PostMapping("/add-to-cycle")
    public ResponseEntity<DefaultapprovalcycleDto> addToCycle(@RequestBody RequestDefaultapprovalcycleDto body) {
        User user = identity.getUserModel();

        String operatorUsername = body.getOperatorUsername();
        if(operatorUsername == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Defaultapprovalcycle updatedDefaultApprovalCycle = defaultapprovalcycleService.addOperatorToTheCycleByUsernameAndUser(operatorUsername, user);
        if(updatedDefaultApprovalCycle == null){
            // if (updatedDefaultApprovalCycle == null) then MOST LIKELY the operator wasn't found or (less likely) it was already in the cycle
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        ModelMapper modelMapper = new ModelMapper();
        DefaultapprovalcycleDto updatedDefaultApprovalCycleDto = modelMapper.map(updatedDefaultApprovalCycle, DefaultapprovalcycleDto.class);

        return new ResponseEntity<>(updatedDefaultApprovalCycleDto, HttpStatus.OK);
    }

    // expects body with: operatorUsername
    @DeleteMapping("/remove-from-cycle")
    public ResponseEntity<List<DefaultapprovalcycleDto>> removeFromCycle(@RequestBody RequestDefaultapprovalcycleDto body) {
        User user = identity.getUserModel();

        String operatorUsername = body.getOperatorUsername();
        if(operatorUsername == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Boolean wasRemoved = defaultapprovalcycleService.removeOperatorFromTheCycleByUsernameAndUser(operatorUsername, user);
        if(wasRemoved == null){
            // if (wasRemoved == null) then MOST LIKELY the operator wasn't found, or it was not in the cycle.
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        List<Defaultapprovalcycle> updatedDefaultApprovalCycle = defaultapprovalcycleService.getAllByUser(user);

        ModelMapper modelMapper = new ModelMapper();
        List<DefaultapprovalcycleDto> updatedDefaultApprovalCycleDto = updatedDefaultApprovalCycle.stream().map(
                operatorInCycle -> modelMapper.map(operatorInCycle, DefaultapprovalcycleDto.class))
                .collect(Collectors.toList());

        return new ResponseEntity<>(updatedDefaultApprovalCycleDto, HttpStatus.OK);
    }
}
