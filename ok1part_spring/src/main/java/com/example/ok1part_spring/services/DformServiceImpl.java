package com.example.ok1part_spring.services;

import com.example.ok1part_spring.dto.request_json.RequestFormAnswerQuestionJson;
import com.example.ok1part_spring.models.*;
import com.example.ok1part_spring.repositories.DformRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class DformServiceImpl implements DformService {
    private DformRepository dformRepository;
    private DquestionService dquestionService;
    private EformService eformService;

    @Autowired
    public DformServiceImpl(DformRepository dformRepository, DquestionService dquestionService, EformService eformService) {
        this.dformRepository = dformRepository;
        this.dquestionService = dquestionService;
        this.eformService = eformService;
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

    public List<Dform> findAllByForm(Eform form){
        return dformRepository.findAllByFkform(form);
    }

    public List<Dform> findAllByUser(User requestingUser){
        User clientUser = _getClientUser(requestingUser);

        List<Eform> formsFromUser = eformService.findAllByClientUser(clientUser);
        List<Dform> answersFromUserAndClient = new ArrayList<>();
        formsFromUser.forEach(form -> {
            answersFromUserAndClient.addAll(dformRepository.findAllByFkform(form));
        });

        return answersFromUserAndClient;

    }

    public Dform answerForm(Eform form, RequestFormAnswerQuestionJson[] answers, User requestingUser, Shift shift, Ereason reason, Boolean formResult) {
        boolean formIsOpen = form.getState() == 4;
        if(!formIsOpen){
            return null;
        }

        Dform formAnswer = new Dform();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMddHH:mm");
        String formattedDate =  simpleDateFormat.format(new Date());

        formAnswer.setDcreation(formattedDate);
        formAnswer.setFkopreply(requestingUser);
        formAnswer.setFkform(form);
        formAnswer.setFkreason(reason);
        formAnswer.setFkshift(shift);
        formAnswer.setResult(formResult ? 1 : 0);
        formAnswer.setRemoved(0);

        dformRepository.saveAndFlush(formAnswer);
        List<Dquestion> answersSaved = dquestionService.registerQuestionJsonBulk(answers, form, formAnswer);

        if(answersSaved == null){
            return null;
        }

        return formAnswer;
    }
}
