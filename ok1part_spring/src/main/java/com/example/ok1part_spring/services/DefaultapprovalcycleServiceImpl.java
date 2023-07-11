package com.example.ok1part_spring.services;

import com.example.ok1part_spring.models.Defaultapprovalcycle;
import com.example.ok1part_spring.models.DefaultapprovalcycleId;
import com.example.ok1part_spring.models.User;
import com.example.ok1part_spring.repositories.DefaultapprovalcycleRepository;
import com.example.ok1part_spring.repositories.EapprovalcycleRepository;
import com.example.ok1part_spring.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DefaultapprovalcycleServiceImpl implements DefaultapprovalcycleService {

    private final DefaultapprovalcycleRepository defaultapprovalcycleRepository;
    private final EapprovalcycleRepository eapprovalcycleRepository;
    private final UserRepository userRepository;

    @Autowired
    public DefaultapprovalcycleServiceImpl(DefaultapprovalcycleRepository defaultapprovalcycleRepository, EapprovalcycleRepository eapprovalcycleRepository, UserRepository userRepository){
        this.defaultapprovalcycleRepository = defaultapprovalcycleRepository;
        this.eapprovalcycleRepository = eapprovalcycleRepository;
        this.userRepository = userRepository;
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

    public List<Defaultapprovalcycle> getAllByUser(User requestingUser){
        User clientUser = _getClientUser(requestingUser);

        if(clientUser == null){
            //throw new Exception("Client user not found");
            return null;
        }

        List<Defaultapprovalcycle> allOperatorsInTheCycle = defaultapprovalcycleRepository.findAllByFkclient(clientUser);
        return allOperatorsInTheCycle;
    }

    public Defaultapprovalcycle addOperatorToTheCycleByUsernameAndUser(String username, User requestingUser) {
        User clientUser = _getClientUser(requestingUser);

        if(clientUser == null){
            //throw new Exception("Client user not found");
            return null;
        }

        User operatorUser = userRepository.findFirstByUsername(username);

        if(operatorUser == null){
            //throw new Exception("Operator user not found");
            return null;
        }

        DefaultapprovalcycleId newOperatorInCycleId = new DefaultapprovalcycleId();
        newOperatorInCycleId.setFkclient(clientUser.getId());
        newOperatorInCycleId.setFkoperator(operatorUser.getId());


        Defaultapprovalcycle newOperatorInCycle = new Defaultapprovalcycle();
        newOperatorInCycle.setId(newOperatorInCycleId);
        newOperatorInCycle.setFkclient(clientUser);
        newOperatorInCycle.setFkoperator(operatorUser);

        defaultapprovalcycleRepository.save(newOperatorInCycle);

        return newOperatorInCycle;
    }

    public Boolean removeOperatorFromTheCycleByUsernameAndUser(String username, User requestingUser) {
        User clientUser = _getClientUser(requestingUser);

        if(clientUser == null){
            //throw new Exception("Client user not found");
            return null;
        }

        User operatorUser = userRepository.findFirstByUsername(username);

        if(operatorUser == null){
            //throw new Exception("Operator user not found");
            return null;
        }

        Defaultapprovalcycle operatorInCycle = defaultapprovalcycleRepository.findFirstByFkclientAndFkoperator(clientUser, operatorUser);

        if(operatorInCycle == null){
            //throw new Exception("Operator not found in the cycle");
            return null;
        }

        defaultapprovalcycleRepository.delete(operatorInCycle);

        return true;
    }
}
