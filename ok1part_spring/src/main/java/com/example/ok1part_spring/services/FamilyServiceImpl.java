package com.example.ok1part_spring.services;

import com.example.ok1part_spring.models.Family;
import com.example.ok1part_spring.models.Uap;
import com.example.ok1part_spring.models.User;
import com.example.ok1part_spring.repositories.FamilyRepository;
import com.example.ok1part_spring.repositories.UapRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class FamilyServiceImpl implements FamilyService {
    private final FamilyRepository familyRepository;
    private final UapRepository uapRepository;

    @Autowired
    public FamilyServiceImpl(FamilyRepository familyRepository, UapRepository uapRepository){
        this.familyRepository = familyRepository;
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

    @Override
    public List<Family> searchFamily(User requestingUser, Family familySearch) {
        User clientUser = _getClientUser(requestingUser);

        if(clientUser == null){
            //throw new Exception("Client user not found");
            return null;
        }

        Example<Family> familyExample = Example.of(familySearch);
        List<Family> familyList = familyRepository.findAll(familyExample).stream().filter(family -> {
            Integer fkclient = family.getFkuap().getFkClient();
            return Objects.equals(fkclient, clientUser.getId());
        }).toList();

        return familyList;
    }

    public Family findFamilyByUap(String name, Uap uap) {
        Family family = familyRepository.findFirstByFamilyAndFkuap(name, uap);

        if(family == null){
            //throw new Exception("Family not found");
            return null;
        }

        return family;

    }

    public Family createFamilyByUapNameAndUser(String uapName, String familyName, User requestingUser) {
        User clientUser = _getClientUser(requestingUser);

        if(clientUser == null){
            //throw new Exception("Client user not found");
            return null;
        }

        Uap uap = uapRepository.findFirstByNameAndFkClient(uapName, clientUser.getId());

        if(uap == null){
            //throw new Exception("Uap not found");
            return null;
        }

        Family family = new Family();
        family.setFkuap(uap);
        family.setFamily(familyName);
        familyRepository.save(family);

        return family;
    }

    public Family updateDescriptionByUapNameAndFamilyNameAndUser(String uapName, String familyName, String newDescription, User requestingUser) {
        User clientUser = _getClientUser(requestingUser);

        if(clientUser == null){
            //throw new Exception("Client user not found");
            return null;
        }

        Uap uap = uapRepository.findFirstByNameAndFkClient(uapName, clientUser.getId());

        if(uap == null){
            //throw new Exception("Uap not found");
            return null;
        }

        Family family = familyRepository.findFirstByFamilyAndFkuap(familyName, uap);

        if(family == null){
            //throw new Exception("Family not found");
            return null;
        }

        family.setDescription(newDescription);
        familyRepository.save(family);

        return family;
    }
}
