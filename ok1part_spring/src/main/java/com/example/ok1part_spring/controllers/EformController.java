package com.example.ok1part_spring.controllers;

import com.example.ok1part_spring.dto.*;
import com.example.ok1part_spring.dto.request.RequestEformDto;
import com.example.ok1part_spring.dto.request_json.RequestQuestionJson;
import com.example.ok1part_spring.models.*;
import com.example.ok1part_spring.repositories.FamilyRepository;
import com.example.ok1part_spring.repositories.ReferenceRepository;
import com.example.ok1part_spring.services.*;
import com.example.ok1part_spring.utils.Identity;
import jakarta.annotation.Nullable;
import jakarta.servlet.http.HttpServletRequest;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static com.example.ok1part_spring.security.JwtUserDetailsService.*;

@RestController
@RequestMapping("/eform")
@CrossOrigin(origins = "*")
public class EformController {
    private final EformService eformService;
    private final UserService userService;
    private final EapprovalcycleService eapprovalcycleService;
    private final EquestionService equestionService;
    private final Identity identity;
    private final ReferenceRepository referenceRepository;
    private final FamilyRepository familyRepository;
    private final FamilyService familyService;
    private final ReferenceService referenceService;

    @Autowired
    public EformController(EformService eformService, UserService userService,
                           EapprovalcycleService eapprovalcycleService,
                           EquestionService equestionService, Identity identity,
                           ReferenceRepository referenceRepository,
                           FamilyRepository familyRepository, FamilyService familyService,
                           ReferenceService referenceService) {
        this.eformService = eformService;
        this.userService = userService;
        this.eapprovalcycleService = eapprovalcycleService;
        this.equestionService = equestionService;
        this.identity = identity;
        this.referenceRepository = referenceRepository;
        this.familyRepository = familyRepository;
        this.familyService = familyService;
        this.referenceService = referenceService;
    }

    private User _getDomainOwner(String subdomain){
        return userService.findBySubdomain(subdomain);
    }

    private ResponseEntity<List<EapprovalcycleDto>> _changeOperatorCycleState(Integer id, Integer newState){
        User user = identity.getUserModel();
        if(user == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        Eform form = eformService.findFormByIdAndUser(id, user);
        if(form == null){
            // throw new Error('form not found');
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Eapprovalcycle operatorInCycle = eapprovalcycleService.findOperatorInCycleByFormAndUser(form,user);
        if(operatorInCycle == null){
            // Operator NOT in cycle, or cycle not found;
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        List<Eapprovalcycle> updatedCycle = eapprovalcycleService.updateOperatorStateByFormAndOperatorInCycleAndUser(
                operatorInCycle, user, newState);

        if(updatedCycle == null){
            // if (updatedCycle == null), it means the operator is NOT allowed to change state
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        ModelMapper modelMapper = new ModelMapper();
        List<EapprovalcycleDto> updatedCycleDto = updatedCycle.stream().map(
                        opInCycle -> modelMapper.map(opInCycle, EapprovalcycleDto.class))
                .toList();

        return new ResponseEntity<>(updatedCycleDto, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<EformDto>> getAll(HttpServletRequest request, @RequestParam(value = "title", required = false) String title,
                                                 @RequestParam(value = "state", required = false) Integer state, @RequestParam(value = "family", required = false) String family, @RequestParam(value = "reference", required = false) String reference){
        User clientUser = identity.getClientUserOrClientFromIp(request);
        if(clientUser == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        Eform formSearch = new Eform();
        formSearch.setTitle(title);
        formSearch.setState(state);

        if(family != null){
            Family famSearch = new Family();
            famSearch.setFamily(family);
            List<Family> fams = familyService.searchFamily(clientUser, famSearch);
            if(!fams.isEmpty()){
                Family fam = fams.get(0);
                Reference ref = referenceService.findReference(fam.getFkuap().getName(), fam.getFamily(), reference, clientUser);
                formSearch.setReference(ref);
            }
        }


        List<Eform> formResults = eformService.searchForm(clientUser, formSearch);

        ModelMapper modelMapper = new ModelMapper();
        List<EformDto> formResultsDto = formResults.stream().map(
                        form -> {
                            EformDto dto = modelMapper.map(form, EformDto.class);
                            dto.setOwnerForm(modelMapper.map(userService.findById(form.getOwnerForm()), UserDto.class));
                            return dto;
                        })
                .toList();

        return new ResponseEntity<>(formResultsDto, HttpStatus.OK);
    }

    @GetMapping("/{id}/info")
    public ResponseEntity<EformDto> getInfo(HttpServletRequest request, @PathVariable("id") Integer id){
        User clientUser = identity.getClientUserOrClientFromIp(request);
        if(clientUser == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        Eform form = eformService.findFormByIdAndUser(id, clientUser);

        if(form == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        ModelMapper modelMapper = new ModelMapper();
        EformDto formDto = modelMapper.map(form, EformDto.class);
        formDto.setOwnerForm(modelMapper.map(userService.findById(form.getOwnerForm()), UserDto.class));

        return new ResponseEntity<>(formDto, HttpStatus.OK);
    }

    @GetMapping("/{id}/questions")
    public ResponseEntity<List<RequestQuestionJson>> getQuestions(HttpServletRequest request, @PathVariable("id") Integer id){
        User clientUser = identity.getClientUserOrClientFromIp(request);
        if(clientUser == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        Eform form = eformService.findFormByIdAndUser(id, clientUser);

        if(form == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        List<Equestion> questions = eformService.getFormQuestionsByFormAndUser(form, clientUser);

        if(questions == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        List<RequestQuestionJson> questionsJson = equestionService.getQuestionJsonBulk(questions);
        return new ResponseEntity<>(questionsJson, HttpStatus.OK);
    }

    @GetMapping("/{id}/comments")
    public ResponseEntity<String> getComments(HttpServletRequest request, @PathVariable("id") Integer id){
        User clientUser = identity.getClientUserOrClientFromIp(request);
        if(clientUser == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        Eform form = eformService.findFormByIdAndUser(id, clientUser);

        if(form == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(form.getComments(), HttpStatus.OK);
    }

    @GetMapping("/{id}/approval-cycle")
    public ResponseEntity<List<EapprovalcycleDto> > getApprovalCycle(HttpServletRequest request, @PathVariable("id") Integer id){
        User clientUser = identity.getClientUserOrClientFromIp(request);
        if(clientUser == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        Eform form = eformService.findFormByIdAndUser(id, clientUser);

        if(form == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        List<Eapprovalcycle> cycle = eapprovalcycleService.getCycleByForm(form);

        if(cycle == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        ModelMapper modelMapper = new ModelMapper();
        List<EapprovalcycleDto> cycleDto = cycle.stream().map(
                        cycle_ -> modelMapper.map(cycle_, EapprovalcycleDto.class))
                .toList();

        return new ResponseEntity<>(cycleDto, HttpStatus.OK);
    }

    //expects body: familyName, referenceName, title, description?
    @PostMapping("/create")
    @Secured(ROLE_BACKEND_FORMS)
    public ResponseEntity<EformDto> createForm(@RequestBody RequestEformDto body){
        User user = identity.getUserModel();

        String familyName = body.getFamilyName();
        String referenceName = body.getReferenceName();
        String formTitle = body.getTitle();
        String formDescription = body.getDescription();

        if(familyName == null || referenceName == null || formTitle == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Eform newForm = eformService.createFormByFamilyAndReferenceAndUser(familyName, referenceName,
                user, formTitle, formDescription);

        if(newForm == null){
            // if (newForm == null) then MOST LIKELY the uap, family or reference wasn't found
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        ModelMapper modelMapper = new ModelMapper();
        EformDto newFormDto = modelMapper.map(newForm, EformDto.class);
        newFormDto.setOwnerForm(modelMapper.map(userService.findById(newForm.getOwnerForm()), UserDto.class));

        return new ResponseEntity<>(newFormDto, HttpStatus.OK);
    }

    //expects body: title?, description?, dnumber?, notes?
    @PatchMapping("/{id}/info")
    @Secured(ROLE_BACKEND_FORMS)
    public ResponseEntity<EformDto> updateInfo(@RequestBody RequestEformDto body, @PathVariable("id") Integer id){
        User user = identity.getUserModel();

        Eform eformModelWithUpdates = new Eform();

        String newTitle = body.getTitle();
        String newDesc = body.getDescription();
        String newDnumb = body.getDnumber();
        String newNotes = body.getNotes();

        if(newTitle != null){
            eformModelWithUpdates.setTitle(newTitle);
        }
        if(newDesc != null){
            eformModelWithUpdates.setDescription(newDesc);
        }
        if(newDnumb != null){
            eformModelWithUpdates.setDnumber(newDnumb);
        }
        if(newNotes != null){
            eformModelWithUpdates.setNotes(newNotes);
        }

        Eform form = eformService.findFormByIdAndUser(id, user);
        if(form == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }


        Eform updatedForm = eformService.updateFormInfoByFormAndUser(form, user, eformModelWithUpdates);
        boolean notAllowed = updatedForm == null;
        if(notAllowed){
            // if (updatedForm == null) then MOST LIKELY the form was NOT found
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        ModelMapper modelMapper = new ModelMapper();
        EformDto updatedFormDto = modelMapper.map(updatedForm, EformDto.class);
        updatedFormDto.setOwnerForm(modelMapper.map(userService.findById(updatedForm.getOwnerForm()), UserDto.class));

        return new ResponseEntity<>(updatedFormDto, HttpStatus.OK);
    }

    //expects body: comments
    @PatchMapping("/{id}/comments")
    @Secured({ROLE_BACKEND_FORMS, ROLE_BACKEND_APPROVATION})
    public ResponseEntity<EformDto> updateComments(@RequestBody RequestEformDto body, @PathVariable("id") Integer id){
        User user = identity.getUserModel();

        Eform form = eformService.findFormByIdAndUser(id, user);

        if(form == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        String stringifiedCommentsJson = body.getComments();

        if(stringifiedCommentsJson == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Eform updatedForm = eformService.updateFormCommentsByFormAndUser(form, stringifiedCommentsJson, user);
        boolean notAllowed = updatedForm == null;
        if(notAllowed){
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        ModelMapper modelMapper = new ModelMapper();
        EformDto updatedFormDto = modelMapper.map(updatedForm, EformDto.class);
        updatedFormDto.setOwnerForm(modelMapper.map(userService.findById(updatedForm.getOwnerForm()), UserDto.class));


        return new ResponseEntity<>(updatedFormDto, HttpStatus.OK);
    }

    //expects body: questions
    @PatchMapping("/{id}/questions")
    @Secured(ROLE_BACKEND_FORMS)
    public ResponseEntity<List<RequestQuestionJson>> updateQuestions(@RequestBody RequestEformDto body, @PathVariable("id") Integer id){
        User user = identity.getUserModel();

        RequestQuestionJson[] questions = body.getQuestions();
        boolean notValidJson = questions == null || (questions.length > 0 && questions[0].getId_() == null);
        if(notValidJson){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Eform form = eformService.findFormByIdAndUser(id, user);

        if(form == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        List<Equestion> updatedQuestions = eformService.updateFormQuestionsByFormAndUser(form, questions, user);
        boolean notAllowed = updatedQuestions == null;
        if(notAllowed){
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        List<RequestQuestionJson> updatedQuestionsJson = equestionService.getQuestionJsonBulk(updatedQuestions);
        return new ResponseEntity<>(updatedQuestionsJson, HttpStatus.OK);
    }

    //does NOT need body
    @PostMapping("/{id}/send-for-approval")
    @Secured(ROLE_BACKEND_FORMS)
    public ResponseEntity<EformDto> sendForApproval(@PathVariable("id") Integer id){
        User user = identity.getUserModel();

        Eform form = eformService.findFormByIdAndUser(id, user);
        if(form == null){
            // throw new Error('form not found');
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Eform updatedForm = eapprovalcycleService.sendFormForApprovalByUser(form, user);
        boolean notAllowed = updatedForm == null;
        if(notAllowed){
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        ModelMapper modelMapper = new ModelMapper();
        EformDto updatedFormDto = modelMapper.map(updatedForm, EformDto.class);
        updatedFormDto.setOwnerForm(modelMapper.map(userService.findById(updatedForm.getOwnerForm()), UserDto.class));

        return new ResponseEntity<>(updatedFormDto, HttpStatus.OK);
    }

    //does NOT need body
    @PostMapping("/{id}/approve")
    @Secured(ROLE_BACKEND_APPROVATION)
    public ResponseEntity<List<EapprovalcycleDto>> approveForm(@PathVariable("id") Integer id){
        return _changeOperatorCycleState(id, 2);
    }

    //does NOT need body
    @PostMapping("/{id}/unapprove")
    @Secured(ROLE_BACKEND_APPROVATION)
    public ResponseEntity<List<EapprovalcycleDto>> unapproveForm(@PathVariable("id") Integer id){
      return _changeOperatorCycleState(id, 1);
    }

    //does NOT need body
    @PostMapping("/{id}/discard")
    @Secured(ROLE_BACKEND_FORMS)
    public ResponseEntity<EformDto> discardForm(@PathVariable("id") Integer id){
        User user = identity.getUserModel();

        Eform form = eformService.findFormByIdAndUser(id, user);
        if(form == null){
            // throw new Error('form not found');
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Eform updatedForm = eapprovalcycleService.discardFormByUser(form, user);
        boolean notAllowed = updatedForm == null;
        if(notAllowed){
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        ModelMapper modelMapper = new ModelMapper();
        EformDto updatedFormDto = modelMapper.map(updatedForm, EformDto.class);
        updatedFormDto.setOwnerForm(modelMapper.map(userService.findById(updatedForm.getOwnerForm()), UserDto.class));

        return new ResponseEntity<>(updatedFormDto, HttpStatus.OK);
    }

}
