package com.example.ok1part_spring.services;

import com.example.ok1part_spring.models.Ereason;
import com.example.ok1part_spring.models.Shift;
import com.example.ok1part_spring.models.User;
import com.example.ok1part_spring.repositories.ShiftRepository;
import com.example.ok1part_spring.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShiftServiceImpl implements ShiftService{
    private final ShiftRepository shiftRepository;
    private final UserRepository userRepository;

    @Autowired
    public ShiftServiceImpl(ShiftRepository shiftRepository, UserRepository userRepository){
        this.shiftRepository = shiftRepository;
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

    public List<Shift> getAll(){
        return shiftRepository.findAll();
    }

    public List<Shift> getAllByUser(User requestingUser){
        User clientUser = _getClientUser(requestingUser);

        return shiftRepository.findAllByFkclient(clientUser);
    }

    @Override
    public Shift findShiftByNameAndUser(String shiftName, User requestingUser) {
        User clientUser = _getClientUser(requestingUser);

        if(clientUser == null){
            //throw new Exception("Client user not found");
            return null;
        }

        Shift shift = shiftRepository.findFirstByNameAndFkclient(shiftName, clientUser);

        if(shift == null){
            //throw new Exception("Shift not found");
            return null;
        }

        return shift;
    }

    public Shift createShiftByUser(String shiftName, User requestingUser) {
        User clientUser = _getClientUser(requestingUser);

        if(clientUser == null){
            //throw new Exception("Client user not found");
            return null;
        }

        Shift newShift = new Shift();
        newShift.setFkclient(clientUser);
        newShift.setName(shiftName);
        shiftRepository.save(newShift);

        return newShift;
    }

    public Shift updateShiftDescriptionByNameAndUser(String shiftName, String shiftNewDescription, User requestingUser) {
        User clientUser = _getClientUser(requestingUser);

        if(clientUser == null){
            //throw new Exception("Client user not found");
            return null;
        }

        Shift shiftToUpdate = shiftRepository.findFirstByNameAndFkclient(shiftName, clientUser);

        if(shiftToUpdate == null){
            //throw new Exception("Shift not found");
            return null;
        }

        shiftToUpdate.setDescription(shiftNewDescription);
        shiftRepository.save(shiftToUpdate);

        return shiftToUpdate;
    }

    public Shift updateShiftNameByNameAndUser(String shiftName, String shiftNewName, User requestingUser) {
        User clientUser = _getClientUser(requestingUser);

        if(clientUser == null){
            //throw new Exception("Client user not found");
            return null;
        }

        Shift shiftToUpdate = shiftRepository.findFirstByNameAndFkclient(shiftName, clientUser);

        if(shiftToUpdate == null){
            //throw new Exception("Shift not found");
            return null;
        }

        shiftToUpdate.setName(shiftNewName);
        shiftRepository.save(shiftToUpdate);

        return shiftToUpdate;
    }

    public Boolean removeShiftByNameAndUser(String shiftName, User requestingUser) {
        User clientUser = _getClientUser(requestingUser);

        if(clientUser == null){
            //throw new Exception("Client user not found");
            return null;
        }

        Shift shiftToUpdate = shiftRepository.findFirstByNameAndFkclient(shiftName, clientUser);

        if(shiftToUpdate == null){
            //throw new Exception("Shift not found");
            return null;
        }

        shiftRepository.delete(shiftToUpdate);

        return true;
    }
}
