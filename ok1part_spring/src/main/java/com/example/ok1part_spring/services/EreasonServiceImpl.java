package com.example.ok1part_spring.services;

import com.example.ok1part_spring.models.Defaultapprovalcycle;
import com.example.ok1part_spring.models.Ereason;
import com.example.ok1part_spring.models.User;
import com.example.ok1part_spring.repositories.EreasonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EreasonServiceImpl implements EreasonService{
    private final EreasonRepository ereasonRepository;

    @Autowired
    public EreasonServiceImpl(EreasonRepository ereasonRepository){
        this.ereasonRepository = ereasonRepository;
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

    public List<Ereason> getAllByUser(User requestingUser){
        User clientUser = _getClientUser(requestingUser);

        return ereasonRepository.findAllByFkclient(clientUser);
    }

    @Override
    public Ereason findReasonByLabelAndUser(String label, User user) {
        User clientUser = _getClientUser(user);

        if(clientUser == null){
            //throw new Exception("Client user not found");
            return null;
        }

        Ereason reason = ereasonRepository.findFirstByLabelAndFkclient(label, clientUser);

        if(reason == null){
            //throw new Exception("Reason not found");
            return null;
        }

        return reason;
    }

    public Ereason addReasonByUser(String label, User requestingUser) {
        User clientUser = _getClientUser(requestingUser);

        if(clientUser == null){
            //throw new Exception("Client user not found");
            return null;
        }

        Ereason newReason = new Ereason();
        newReason.setFkclient(clientUser);
        newReason.setLabel(label);
        newReason.setState(1);
        ereasonRepository.save(newReason);

        return newReason;
    }

    public Ereason updateReasonLabelByLabelAndUser(String label, String newLabel, User requestingUser) {
        User clientUser = _getClientUser(requestingUser);

        if(clientUser == null){
            //throw new Exception("Client user not found");
            return null;
        }

        Ereason reasonToUpdate = ereasonRepository.findFirstByLabelAndFkclient(label, clientUser);

        if(reasonToUpdate == null){
            //throw new Exception("Reason not found");
            return null;
        }

        reasonToUpdate.setLabel(newLabel);
        ereasonRepository.save(reasonToUpdate);

        return reasonToUpdate;
    }

    public Boolean removeReasonByLabelAndUser(String label, User requestingUser) {
        User clientUser = _getClientUser(requestingUser);

        if(clientUser == null){
            //throw new Exception("Client user not found");
            return null;
        }

        Ereason reasonToDelete = ereasonRepository.findFirstByLabelAndFkclient(label, clientUser);

        if(reasonToDelete == null){
            //throw new Exception("Reason not found");
            return null;
        }

        ereasonRepository.delete(reasonToDelete);

        return true;
    }
}
