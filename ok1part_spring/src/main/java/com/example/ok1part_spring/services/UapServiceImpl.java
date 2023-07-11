package com.example.ok1part_spring.services;

import com.example.ok1part_spring.models.Eform;
import com.example.ok1part_spring.models.Uap;
import com.example.ok1part_spring.models.User;
import com.example.ok1part_spring.repositories.UapRepository;
import com.example.ok1part_spring.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class UapServiceImpl implements UapService {
    private final UapRepository uapRepository;

    @Autowired
    public UapServiceImpl(UapRepository uapRepository) {
        this.uapRepository = uapRepository;
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

    /***
     * This will return null if a client user is not found.
     * @param name
     * @param requestingUser
     * @return
     */
    private Uap _findByNameAndUser(String name, User requestingUser){
        User clientUser = _getClientUser(requestingUser);

        if(clientUser == null){
            //throw new Exception("Client user not found");
            return null;
        }

        Uap uap = uapRepository.findFirstByNameAndFkClient(name, clientUser.getId());

        if(uap == null){
            //throw new Exception("Uap not found");
            return null;
        }

        return uap;
    }

    public List<Uap> searchUap(User requestingUser, Uap uapSearch) {
        User clientUser = _getClientUser(requestingUser);

        if(clientUser == null){
            //throw new Exception("Client user not found");
            return null;
        }

        Example<Uap> uapExample = Example.of(uapSearch);
        List<Uap> uapList = uapRepository.findAll(uapExample).stream().filter(uap -> {
            Integer fkclient = uap.getFkClient();
            return Objects.equals(fkclient, clientUser.getId());
        }).toList();

        return uapList;
    }

    public Uap findUapByUser(String name, User requestingUser) {
        Uap uap = _findByNameAndUser(name, requestingUser);

        if(uap == null){
            //throw new Exception("Client user or uap not found");
            return null;
        }

        return uap;
    }

    public Uap registerUapByUser(String name, User requestingUser) {
        User clientUser = _getClientUser(requestingUser);

        if(clientUser == null){
            //throw new Exception("Client user not found");
            return null;
        }

        Uap newUap = new Uap();
        newUap.setName(name);
        newUap.setFkClient(clientUser.getId());
        uapRepository.save(newUap);
        return newUap;
    }

    public Uap updateNameByNameAndUser(String name, String newName, User requestingUser) {
        Uap uap = _findByNameAndUser(name, requestingUser);

        if(uap == null){
            //throw new Exception("Client user or uap not found");
            return null;
        }

        uap.setName(newName);
        uapRepository.save(uap);
        return uap;
    }

    public Uap updateDescriptionByNameAndUser(String name, String newDescription, User requestingUser) {
        Uap uap = _findByNameAndUser(name, requestingUser);

        if(uap == null){
            //throw new Exception("Client user or uap not found");
            return null;
        }

        uap.setDescription(newDescription);
        uapRepository.save(uap);
        return uap;
    }
}
