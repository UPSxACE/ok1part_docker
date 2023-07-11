package com.example.ok1part_spring.controllers;

import com.example.ok1part_spring.dto.EreasonDto;
import com.example.ok1part_spring.dto.ReferenceDto;
import com.example.ok1part_spring.dto.ShiftDto;
import com.example.ok1part_spring.dto.UapDto;
import com.example.ok1part_spring.dto.request.RequestReferenceDto;
import com.example.ok1part_spring.dto.request.RequestShiftDto;
import com.example.ok1part_spring.dto.request.RequestUapDto;
import com.example.ok1part_spring.models.Ereason;
import com.example.ok1part_spring.models.Shift;
import com.example.ok1part_spring.models.Uap;
import com.example.ok1part_spring.models.User;
import com.example.ok1part_spring.services.EreasonService;
import com.example.ok1part_spring.services.ShiftService;
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

import static com.example.ok1part_spring.security.JwtUserDetailsService.ROLE_BACKEND_MANAGMENT;

@RestController
@RequestMapping("/shift")
@CrossOrigin(origins = "*")
public class ShiftController {

    private final ShiftService shiftService;
    private final UserService userService;
    private final Identity identity;

    @Autowired
    public ShiftController(ShiftService shiftService, UserService userService, Identity identity){
        this.shiftService = shiftService;
        this.userService = userService;
        this.identity = identity;
    }

    private User _getDomainOwner(String subdomain){
        return userService.findBySubdomain(subdomain);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ShiftDto>> getAll(HttpServletRequest request){
        User clientUser = identity.getClientUserOrClientFromIp(request);
        if(clientUser == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        List<Shift> shiftResults = shiftService.getAllByUser(clientUser);

        ModelMapper modelMapper = new ModelMapper();
        List<ShiftDto> shiftResultsDto = shiftResults.stream().map(
                        shift -> modelMapper.map(shift, ShiftDto.class))
                .toList();

        return new ResponseEntity<>(shiftResultsDto, HttpStatus.OK);
    }

    // expects body with: name
    @PostMapping("/create")
    @Secured(ROLE_BACKEND_MANAGMENT)
    public ResponseEntity<ShiftDto> create(@RequestBody RequestShiftDto body) {
        User user = identity.getUserModel();

        String name = body.getName();

        if(name == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Shift newShift = shiftService.createShiftByUser(name,user);

        ModelMapper modelMapper = new ModelMapper();
        ShiftDto newShiftDto = modelMapper.map(newShift, ShiftDto.class);

        return new  ResponseEntity<>(newShiftDto, HttpStatus.OK);
    }

    // expects body: name, newName?, newDescription?, newShiftStart?, newShiftEnd?
    @PatchMapping("/update")
    @Secured(ROLE_BACKEND_MANAGMENT)
    public ResponseEntity<ShiftDto> update(@RequestBody RequestShiftDto body) {
        User user = identity.getUserModel();

        String name = body.getName();
        String newName = body.getNew_name();
        String newDescription = body.getNew_description();
        String newShiftStart = body.getNew_shift_start();
        String newShiftEnd = body.getNew_shift_end();

        Shift shift = null;

        if(name != null && newDescription != null){
            shift = shiftService.updateShiftDescriptionByNameAndUser(name, newDescription, user);
        }

        if(name != null && newName != null){
            shift = shiftService.updateShiftNameByNameAndUser(name, newName, user);
        }

        if(name != null && newShiftStart != null){
            // not implemented yet
        }

        if(name != null && newShiftEnd != null){
            // not implemented yet
        }

        if(shift == null){
            // if (shift == null), it should mean one of those:
            // 1 - The user didn't send a body with the field 'name'
            // 2 - The user sent a body with no 'new<Property>' field
            // 3 - The user sent a body with at least one of the 'new<Property>' fields, and 'name',
            // but one of the methods from the shiftService returned null, so probably the 'name' was wrong.

            if(name == null){
                return new  ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }

            return new  ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        ModelMapper modelMapper = new ModelMapper();
        ShiftDto newShiftDto = modelMapper.map(shift, ShiftDto.class);

        return new ResponseEntity<>(newShiftDto, HttpStatus.OK);
    }

    // expects body: name
    @DeleteMapping("/delete")
    @Secured(ROLE_BACKEND_MANAGMENT)
    public ResponseEntity<List<ShiftDto>> delete(@RequestBody RequestShiftDto body){
        User user = identity.getUserModel();

        String name = body.getName();
        if(name == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Boolean wasRemoved = shiftService.removeShiftByNameAndUser(name, user);
        if(wasRemoved == null){
            // if (wasRemoved == null) then MOST LIKELY the name wasn't found.
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        List<Shift> updatedShiftEntries = shiftService.getAll();

        ModelMapper modelMapper = new ModelMapper();
        List<ShiftDto> updatedShiftEntriesDto = updatedShiftEntries.stream().map(
                        shift -> modelMapper.map(shift, ShiftDto.class))
                .collect(Collectors.toList());

        return new ResponseEntity<>(updatedShiftEntriesDto, HttpStatus.OK);
    }

}
