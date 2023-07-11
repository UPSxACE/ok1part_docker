package com.example.ok1part_spring.services;

import com.example.ok1part_spring.models.Shift;
import com.example.ok1part_spring.models.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ShiftService {
    List<Shift> getAllByUser(User requestingUser);
    List<Shift> getAll();
    Shift findShiftByNameAndUser(String shiftName, User requestingUser);
    Shift createShiftByUser(String shiftName, User requestingUser);
    Shift updateShiftDescriptionByNameAndUser(String shiftName, String shiftNewDescription, User requestingUser);
    Shift updateShiftNameByNameAndUser(String shiftName, String shiftNewName, User requestingUser);
    Boolean removeShiftByNameAndUser(String shiftName, User requestingUser);
}
