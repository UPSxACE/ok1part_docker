package com.example.ok1part_spring.services;

import com.example.ok1part_spring.models.Family;
import com.example.ok1part_spring.models.Uap;
import com.example.ok1part_spring.models.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface FamilyService {
    List<Family> searchFamily(User requestingUser, Family familySearch);
    Family findFamilyByUap(String name, Uap uap);
    Family createFamilyByUapNameAndUser(String uapName, String familyName, User requestingUser);

    Family updateDescriptionByUapNameAndFamilyNameAndUser(String uapName, String familyName, String newDescription, User requestingUser);
}
