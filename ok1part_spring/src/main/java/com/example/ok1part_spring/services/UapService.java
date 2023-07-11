package com.example.ok1part_spring.services;

import com.example.ok1part_spring.models.Uap;
import com.example.ok1part_spring.models.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UapService {
    List<Uap> searchUap(User requestingUser, Uap uapSearch);
    Uap findUapByUser(String name, User requestingUser);
    Uap registerUapByUser(String name, User requestingUser);
    Uap updateNameByNameAndUser(String name, String newName, User requestingUser);
    Uap updateDescriptionByNameAndUser(String name, String newDescription, User requestingUser);

}
