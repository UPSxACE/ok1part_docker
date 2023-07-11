package com.example.ok1part_spring.services;

import com.example.ok1part_spring.models.*;
import com.example.ok1part_spring.repositories.FamilyRepository;
import com.example.ok1part_spring.repositories.ReferenceRepository;
import com.example.ok1part_spring.repositories.UapRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReferenceServiceImpl implements ReferenceService {


    private final ReferenceRepository referenceRepository;
    private final UapRepository uapRepository;
    private final FamilyRepository familyRepository;
    private final FamilyService familyService;

    @Autowired
    public ReferenceServiceImpl(ReferenceRepository referenceRepository, UapRepository uapRepository,
                                FamilyRepository familyRepository,FamilyService familyService){
        this.referenceRepository = referenceRepository;
        this.uapRepository = uapRepository;
        this.familyRepository = familyRepository;
        this.familyService = familyService;
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

    public List<Reference> getAllReferencesByUser(User user) {
        User clientUser = _getClientUser(user);

        List<Reference> references = new ArrayList<>();

        List<Uap> uaps = uapRepository.findAllByFkClient(clientUser.getId());
        List<Family> familys = new ArrayList<>();
        uaps.forEach(uap -> {
            familys.addAll(familyRepository.findAllByFkuap(uap));
        });
        familys.forEach(family -> {
            references.addAll(referenceRepository.findByFkfamily(family));
        });

        return references;
    }

    public List<Reference> getAllReferencesByFamily(Family family) {
        List<Reference> familyReferences = referenceRepository.findByFkfamily(family);

        if(familyReferences == null){
           return null;
        }

        return familyReferences;
    }

    /***
     * This will return null if a reference is not found.
     * @param uapName
     * @param familyName
     * @param referenceName
     * @param requestingUser
     * @return
     */



    public Reference findReference(String uapName, String familyName, String referenceName, User requestingUser){
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

        ReferenceId referenceId = new ReferenceId();
        referenceId.setFkfamily(family.getFamily());
        referenceId.setReference(referenceName);

        Optional<Reference> referenceQuery = referenceRepository.findById(referenceId);

        if(referenceQuery.isEmpty()){
            //throw new Exception("Reference not found");
            return null;
        }

        Reference reference = referenceQuery.get();
        return reference;
    }

    public Reference findReferenceFamilyOnly(String familyName, String referenceName, User requestingUser){
        User clientUser = _getClientUser(requestingUser);

        if(clientUser == null){
            //throw new Exception("Client user not found");
            return null;
        }


        Family famSearch = new Family();
        famSearch.setFamily(familyName);
        List<Family> fams = familyService.searchFamily(requestingUser, famSearch);
        if(fams.isEmpty()) {
            return null;
        }
        Family family = fams.get(0);

        ReferenceId referenceId = new ReferenceId();
        referenceId.setFkfamily(family.getFamily());
        referenceId.setReference(referenceName);

        Optional<Reference> referenceQuery = referenceRepository.findById(referenceId);

        if(referenceQuery.isEmpty()){
            //throw new Exception("Reference not found");
            return null;
        }

        return referenceQuery.get();
    }

    public Reference createReferenceByUapNameAndFamilyNameAndUser(String uapName, String familyName,
                                                                  String referenceName, User requestingUser) {
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

        ReferenceId newReferenceId = new ReferenceId();
        newReferenceId.setFkfamily(family.getFamily());
        newReferenceId.setReference(referenceName);

        Reference newReference = new Reference();
        newReference.setId(newReferenceId);
        newReference.setFkfamily(family);

        referenceRepository.save(newReference);

        return newReference;
    }

    public Reference updateReferenceDescriptionByUapNameAndFamilyNameAndUser(String uapName, String familyName,
                                                                             String referenceName,
                                                                             String newDescription, User requestingUser) {

        Reference reference = this.findReference(uapName, familyName, referenceName, requestingUser);

        if(reference == null){
            //throw new Exception("Reference not found");
            return null;
        }

        reference.setDescription(newDescription);
        referenceRepository.save(reference);

        return reference;
    }
}
