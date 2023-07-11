package com.example.ok1part_spring.services;

import com.example.ok1part_spring.models.Eapprovalcycle;
import com.example.ok1part_spring.models.Eform;
import com.example.ok1part_spring.models.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface EapprovalcycleService {
    List<Eapprovalcycle> getCycleByForm(Eform form);
    List<Eapprovalcycle> startNewCycleByFormAndUser(Eform form, User requestingUser);
    Eapprovalcycle findOperatorInCycleByFormAndUser(Eform form, User requestingUser);
    List<Eapprovalcycle> updateOperatorStateByFormAndOperatorInCycleAndUser(Eapprovalcycle operatorInCycle, User requestingUser, Integer newState);
    Eform approveForm(Eform form);
    Eform discardFormByUser(Eform form, User user);
    Eform sendFormForApprovalByUser(Eform form, User user);
}
