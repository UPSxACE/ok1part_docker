package com.example.ok1part_spring.services;

import com.example.ok1part_spring.dto.request.RequestEformDto;
import com.example.ok1part_spring.dto.request_json.RequestLinkJson;
import com.example.ok1part_spring.dto.request_json.RequestQuestionJson;
import com.example.ok1part_spring.models.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface EformService {
    List<Eform> findAllByClientUser(User clientUser);
    List<Eform> searchForm(User user, Eform formSearch);
    List<Equestion> getFormQuestionsByFormAndUser(Eform form, User requestingUser);
    Eform findFormByIdAndUser(Integer formId, User requestingUser);
    Eform createFormByFamilyAndReferenceAndUser(String family, String reference, User requestingUser, String title, String description);
    Eform createFormByUapAndFamilyAndReferenceAndUser(String uap, String family, String reference, User requestingUser, String title, String description);
    Eform updateFormInfoByFormAndUser(Eform form, User requestingUser, Eform eformUpdates);
    // Not needed:
    // List<Eapprovalcycle> updateFormCycleOperatorStateByFormIdAndOperatorUsername(Integer formId, String operatorUsername, Integer newState);
    List<Equestion> updateFormQuestionsByFormAndUser(Eform form, RequestQuestionJson[] questionsJson, User requestingUser);
    Eform updateFormCommentsByFormAndUser(Eform form, String stringifiedCommentsJSON, User requestingUser);
    List<Eqlink> updateFormLinksByFormIdAndUser(Integer formId, RequestLinkJson[] links, User requestingUser);


}
