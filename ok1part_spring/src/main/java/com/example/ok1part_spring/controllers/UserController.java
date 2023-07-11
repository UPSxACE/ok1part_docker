package com.example.ok1part_spring.controllers;

import com.example.ok1part_spring.dto.EapprovalcycleDto;
import com.example.ok1part_spring.dto.PermissionDto;
import com.example.ok1part_spring.dto.ProfileDto;
import com.example.ok1part_spring.dto.UserDto;
import com.example.ok1part_spring.dto.request.RequestUserDto;
import com.example.ok1part_spring.models.Eform;
import com.example.ok1part_spring.models.Permission;
import com.example.ok1part_spring.models.Profile;
import com.example.ok1part_spring.models.User;
import com.example.ok1part_spring.repositories.PermissionRepository;
import com.example.ok1part_spring.repositories.ProfileRepository;
import com.example.ok1part_spring.repositories.UserRepository;
import com.example.ok1part_spring.services.PermissionService;
import com.example.ok1part_spring.services.UserService;
import com.example.ok1part_spring.utils.Identity;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {
    private final UserService userService;
    private final Identity identity;
    private final UserRepository userRepository;
    private final PermissionRepository permissionRepository;
    private final PermissionService permissionService;
    private final ProfileRepository profileRepository;

    @Autowired
    public UserController(UserService userService, Identity identity,
                          UserRepository userRepository,
                          PermissionRepository permissionRepository,
                          PermissionService permissionService,
                          ProfileRepository profileRepository){
        this.userService = userService;
        this.identity = identity;
        this.userRepository = userRepository;
        this.permissionRepository = permissionRepository;
        this.permissionService = permissionService;
        this.profileRepository = profileRepository;
    }

    @PatchMapping("/{id}/add-role/{permission}")
    public ResponseEntity<PermissionDto> patchAddRole(@PathVariable("id") Integer id, @PathVariable("permission") String permissionName){
        User user = userService.findByIdAndUser(id, identity.getUserModel());

        if(user == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Optional<Permission> permission = permissionRepository.findById(user.getId());
        return switch (permissionName) {
            case "canForms" -> {
                if (permission.isPresent()) {
                    Permission updatedPermission = permission.get();
                    updatedPermission.setCanForms(true);
                    permissionRepository.saveAndFlush(updatedPermission);
                    ModelMapper modelMapper = new ModelMapper();
                    PermissionDto updatedPermissionDto = modelMapper.map(updatedPermission, PermissionDto.class);
                    yield new ResponseEntity<>(updatedPermissionDto, HttpStatus.OK);
                }
                yield new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            case "canApprovation" -> {
                if(permission.isPresent()){
                    Permission updatedPermission = permission.get();
                    updatedPermission.setCanApprovation(true);
                    permissionRepository.saveAndFlush(updatedPermission);
                    ModelMapper modelMapper = new ModelMapper();
                    PermissionDto updatedPermissionDto = modelMapper.map(updatedPermission, PermissionDto.class);
                    yield new ResponseEntity<>(updatedPermissionDto,HttpStatus.OK);
                }
                yield new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            case "canManagement" -> {
                if(permission.isPresent()){
                    Permission updatedPermission = permission.get();
                    updatedPermission.setCanManagement(true);
                    permissionRepository.saveAndFlush(updatedPermission);
                    ModelMapper modelMapper = new ModelMapper();
                    PermissionDto updatedPermissionDto = modelMapper.map(updatedPermission, PermissionDto.class);
                    yield new ResponseEntity<>(updatedPermissionDto,HttpStatus.OK);
                }
                yield new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            default -> new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        };

    }

    @PatchMapping("/{id}/remove-role/{permission}")
    public ResponseEntity<PermissionDto> patchRemoveRole(@PathVariable("id") Integer id, @PathVariable("permission") String permissionName) {
        User user = userService.findByIdAndUser(id, identity.getUserModel());

        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Optional<Permission> permission = permissionRepository.findById(user.getId());
        return switch (permissionName) {
            case "canForms" -> {
                if (permission.isPresent()) {
                    Permission updatedPermission = permission.get();
                    updatedPermission.setCanForms(false);
                    permissionRepository.saveAndFlush(updatedPermission);
                    ModelMapper modelMapper = new ModelMapper();
                    PermissionDto updatedPermissionDto = modelMapper.map(updatedPermission, PermissionDto.class);
                    yield new ResponseEntity<>(updatedPermissionDto, HttpStatus.OK);
                }
                yield new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            case "canApprovation" -> {
                if (permission.isPresent()) {
                    Permission updatedPermission = permission.get();
                    updatedPermission.setCanApprovation(false);
                    permissionRepository.saveAndFlush(updatedPermission);
                    ModelMapper modelMapper = new ModelMapper();
                    PermissionDto updatedPermissionDto = modelMapper.map(updatedPermission, PermissionDto.class);
                    yield new ResponseEntity<>(updatedPermissionDto, HttpStatus.OK);
                }
                yield new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            case "canManagement" -> {
                if (permission.isPresent()) {
                    Permission updatedPermission = permission.get();
                    updatedPermission.setCanManagement(false);
                    permissionRepository.saveAndFlush(updatedPermission);
                    ModelMapper modelMapper = new ModelMapper();
                    PermissionDto updatedPermissionDto = modelMapper.map(updatedPermission, PermissionDto.class);
                    yield new ResponseEntity<>(updatedPermissionDto, HttpStatus.OK);
                }
                yield new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            default -> new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        };
    }

    @GetMapping("/all")
    public ResponseEntity<List<UserDto>> getAll(){
        User user = identity.getUserModel();

        List<User> users = userService.findAllByUser(user);


        ModelMapper modelMapper = new ModelMapper();
        List<UserDto> usersDto = users.stream().map(
                        user_ -> modelMapper.map(user_, UserDto.class))
                .toList();

        return new ResponseEntity<>(usersDto, HttpStatus.OK);

    }

    // expects body with: username, email, password
    @PostMapping("/create")
    public ResponseEntity<UserDto> postCreateUser(@RequestBody RequestUserDto body) {
        User user = identity.getUserModel();
        User clientUser = user.getFkclient();

        String username = body.getUsername();
        String email = body.getEmail();
        String password = body.getPassword();

        if(username == null || email == null || password == null){
            return new  ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        User newUser = userService.registerUserByClient(username, email, password,
                clientUser != null ? clientUser : user);

        if(newUser == null){
            return new  ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        ModelMapper modelMapper = new ModelMapper();
        UserDto newUserDto = modelMapper.map(newUser, UserDto.class);

        Permission perms = permissionService.getUserPermissions(newUser);
        PermissionDto permsDto = modelMapper.map(perms, PermissionDto.class);

        Optional<Profile> prof = profileRepository.findById(newUser.getId());

        ProfileDto profDto = modelMapper.map(prof, ProfileDto.class);
        newUserDto.setProfile(profDto);

        newUserDto.setPermissions(permsDto);

        return new  ResponseEntity<>(newUserDto, HttpStatus.OK);
    }

    /* Deprecated code below
    // expects body with: username, email, password, companyName
    @PostMapping("/register-client")
    public ResponseEntity<UserDto> postRegisterClient(@RequestBody RequestUserDto body) {
        User newUser = userService.registerClient(body.getUsername(), body.getEmail(), body.getPassword(), body.getCompanyName());

        ModelMapper modelMapper = new ModelMapper();
        UserDto newUserDto = modelMapper.map(newUser, UserDto.class);

        return new  ResponseEntity<>(newUserDto, HttpStatus.OK);
    }


    // expects body with: username, email, password, clientUsername
    @PostMapping("/register-user")
    public ResponseEntity<UserDto> postRegisterUser(@RequestBody RequestUserDto body) {
        User newUser = userService.registerUserByClientUsername(body.getUsername(), body.getEmail(), body.getPassword(), body.getClientUsername());

        ModelMapper modelMapper = new ModelMapper();
        UserDto newUserDto = modelMapper.map(newUser, UserDto.class);

        return new  ResponseEntity<>(newUserDto, HttpStatus.OK);
    }
    */

}
