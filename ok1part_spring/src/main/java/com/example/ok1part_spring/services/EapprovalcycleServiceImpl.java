package com.example.ok1part_spring.services;

import com.example.ok1part_spring.models.*;
import com.example.ok1part_spring.repositories.DefaultapprovalcycleRepository;
import com.example.ok1part_spring.repositories.EapprovalcycleRepository;
import com.example.ok1part_spring.repositories.EformRepository;
import com.example.ok1part_spring.repositories.UserRepository;
import com.example.ok1part_spring.utils.Counter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EapprovalcycleServiceImpl implements EapprovalcycleService{
    private final DefaultapprovalcycleRepository defaultapprovalcycleRepository;
    private final EapprovalcycleRepository eapprovalcycleRepository;
    private final UserRepository userRepository;
    private final EformRepository eformRepository;


    @Autowired
    public EapprovalcycleServiceImpl(DefaultapprovalcycleRepository defaultapprovalcycleRepository, EapprovalcycleRepository eapprovalcycleRepository, UserRepository userRepository,
                                     EformRepository eformRepository){
        this.defaultapprovalcycleRepository = defaultapprovalcycleRepository;
        this.eapprovalcycleRepository = eapprovalcycleRepository;
        this.userRepository = userRepository;
        this.eformRepository = eformRepository;
    }

    /***
     * This will return null if a client user is not found.
     * @param requestingUser
     * @return
     */
    private User _getClientUser(User requestingUser){
        User parentUser = requestingUser.getFkclient();
        if(parentUser == null){
            return requestingUser;
        }
        return parentUser;
    }

    private Eapprovalcycle _addOperatorToTheCycle(User operator, Eform form){
        Eapprovalcycle newOperatorInTheCycle = new Eapprovalcycle();
        newOperatorInTheCycle.setFkform(form);
        newOperatorInTheCycle.setFkoperator(operator);
        newOperatorInTheCycle.setState(1);

        EapprovalcycleId newcycleId = new EapprovalcycleId();
        newcycleId.setFkform(form.getId());
        newcycleId.setFkoperator(operator.getId());
        newOperatorInTheCycle.setId(newcycleId);

        return eapprovalcycleRepository.save(newOperatorInTheCycle);
    }

    @Override
    public List<Eapprovalcycle> getCycleByForm(Eform form) {
        List<Eapprovalcycle> cycle = eapprovalcycleRepository.findAllByFkform(form);

        return cycle;
    }

    public List<Eapprovalcycle> startNewCycleByFormAndUser(Eform form, User requestingUser) {
        User clientUser = _getClientUser(requestingUser);

        if(clientUser == null){
            //throw new Exception("Client user not found");
            return null;
        }

        List<Defaultapprovalcycle> defaultCycle = defaultapprovalcycleRepository.findAllByFkclient(clientUser);

        List <Eapprovalcycle> newCycle = defaultCycle.stream().map(operatorInTheCycle -> {
           return _addOperatorToTheCycle(operatorInTheCycle.getFkoperator(), form);
        }).collect(Collectors.toList());

        return newCycle;
    }

    public Eapprovalcycle findOperatorInCycleByFormAndUser(Eform form, User requestingUser){
        Eapprovalcycle cycle = eapprovalcycleRepository.findFirstByFkformAndFkoperator(form, requestingUser);

        if(cycle == null){
            //throw new Exception("Cycle not found");
            return null;
        }

        return cycle;
    }

    public Eform approveForm(Eform form){
        form.setState(4);
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMddHH:mm");
        String formattedDate =  simpleDateFormat.format(new Date());
        form.setDapproval(formattedDate);
        eformRepository.save(form);
        return form;
    }
    public Eform discardFormByUser(Eform form, User user){
        boolean isEditor = form.getOwnerForm() == user.getId();
        if(!isEditor){
            return null;
        }

        form.setState(3);
        return eformRepository.save(form);
    };

    // if null is returned, it means the user is not allowed
    public List<Eapprovalcycle> updateOperatorStateByFormAndOperatorInCycleAndUser(Eapprovalcycle operatorInCycle, User requestingUser, Integer newState){
        Eform form = operatorInCycle.getFkform();

        Integer formState = form.getState();

        boolean formIsAlreadyDone = formState == 3 || formState == 4 || formState == 5;
        boolean formIsInCreation = formState == 1;

        if(formIsAlreadyDone || formIsInCreation){
            return null;
        }

        boolean formWaitingApproval = formState == 2;
        if(!formWaitingApproval){
            return null;
        }

        if(newState != 1 && newState != 2){
            return null;
        }

        operatorInCycle.setState(newState);
        eapprovalcycleRepository.saveAndFlush(operatorInCycle);

        List<Eapprovalcycle> updatedCycle = eapprovalcycleRepository.findAllByFkform(form);

        Counter approvedCounter = new Counter();
        updatedCycle.forEach(opInCycle -> {
            if(opInCycle.getState() == 2){
                approvedCounter.increment();
            }
        });

        if(approvedCounter.getCount() == updatedCycle.size()){
            approveForm(form);
        }

        return updatedCycle;
    }

    @Override
    public Eform sendFormForApprovalByUser(Eform form, User requestingUser) {
        boolean isEditor = form.getOwnerForm() == requestingUser.getId();
        if(!isEditor){
            return null;
        }

        form.setState(2);
        return eformRepository.save(form);
    }
}
