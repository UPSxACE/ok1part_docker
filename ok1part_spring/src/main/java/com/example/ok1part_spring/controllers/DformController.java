package com.example.ok1part_spring.controllers;

import com.example.ok1part_spring.dto.DformDto;
import com.example.ok1part_spring.dto.EformDto;
import com.example.ok1part_spring.dto.UserDto;
import com.example.ok1part_spring.dto.request.RequestDformDto;
import com.example.ok1part_spring.dto.request.RequestEformDto;
import com.example.ok1part_spring.dto.request_json.RequestFormAnswerQuestionJson;
import com.example.ok1part_spring.dto.request_json.objects.FormAnswerValueObject;
import com.example.ok1part_spring.models.*;
import com.example.ok1part_spring.services.*;
import com.example.ok1part_spring.utils.Identity;
import jakarta.servlet.http.HttpServletRequest;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.example.ok1part_spring.security.JwtUserDetailsService.*;

@RestController
@RequestMapping("/dform")
@CrossOrigin(origins = "*")
public class DformController {
    private final EformService eformService;
    private final UserService userService;
    private final DformService dformService;
    private final ShiftService shiftService;
    private final EreasonService ereasonService;
    private final Identity identity;

    public DformController(EformService eformService, UserService userService, DformService dformService,
                           ShiftService shiftService, EreasonService ereasonService, Identity identity) {
        this.eformService = eformService;
        this.userService = userService;
        this.dformService = dformService;
        this.shiftService = shiftService;
        this.ereasonService = ereasonService;
        this.identity = identity;
    }

    private User _getDomainOwner(String subdomain){
        return userService.findBySubdomain(subdomain);
    }

    @GetMapping("/all")
    @Secured({ROLE_BACKEND_MANAGMENT, ROLE_BACKEND_APPROVATION, ROLE_BACKEND_FORMS})
    public ResponseEntity<List<DformDto>> getAll(){
        User user = identity.getUserModel();

        List<Dform> answers = dformService.findAllByUser(user);


        ModelMapper modelMapper = new ModelMapper();
        List<DformDto> answersDto = answers.stream().map(
                        answer -> modelMapper.map(answer, DformDto.class))
                .toList();

        return new ResponseEntity<>(answersDto, HttpStatus.OK);

    }

    //expects body: shiftName, formData, formResult, reasonName
    @PostMapping("/{id}/answer")
    public ResponseEntity<EformDto> updateInfo(HttpServletRequest request, @RequestBody RequestDformDto body, @PathVariable("id") Integer id){
        User clientUser = identity.getClientUserOrClientFromIp(request);
        if(clientUser == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        User requestingUser = identity.getUserModel();

        String shiftName = body.getShiftName();
        RequestFormAnswerQuestionJson[] answers = body.getFormData();
        Boolean formResult = body.getFormResult();
        String reasonName = body.getReasonName();

        if(shiftName == null || answers == null || formResult == null || reasonName == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Eform form = eformService.findFormByIdAndUser(id, clientUser);

        if(form == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Shift shift = shiftService.findShiftByNameAndUser(shiftName, clientUser);

        if(shift == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Ereason reason = ereasonService.findReasonByLabelAndUser(reasonName, clientUser);

        if(reason == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Dform savedDform = dformService.answerForm(form, answers, requestingUser, shift, reason, formResult);

        if(savedDform == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }



}
