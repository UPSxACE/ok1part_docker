package com.example.ok1part_spring.services;

import com.example.ok1part_spring.models.Family;
import com.example.ok1part_spring.models.Reference;
import com.example.ok1part_spring.models.Uap;
import com.example.ok1part_spring.models.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ReferenceService {
    List<Reference> getAllReferencesByUser(User user);
    List<Reference> getAllReferencesByFamily(Family family);
    Reference findReference(String uap, String family, String reference, User requestingUser);
    Reference findReferenceFamilyOnly(String family, String reference, User requestingUser);
    Reference createReferenceByUapNameAndFamilyNameAndUser(String uapName, String familyName, String referenceName,
                                                           User requestingUser);
    Reference updateReferenceDescriptionByUapNameAndFamilyNameAndUser(String uapName, String familyName,
                                                                      String referenceName, String newDescription,
                                                                      User requestingUser);
}
