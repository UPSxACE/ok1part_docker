package com.example.ok1part_spring.services;

import com.example.ok1part_spring.models.*;
import com.example.ok1part_spring.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final ClientconfigRepository clientconfigRepository;
    private final PermissionRepository permissionRepository;
    private final PasswordEncoder passwordEncoder;
    private final DefaultapprovalcycleRepository defaultapprovalcycleRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, ProfileRepository profileRepository,
                           ClientconfigRepository clientconfigRepository, PermissionRepository permissionRepository,
                           PasswordEncoder passwordEncoder,
                           DefaultapprovalcycleRepository defaultapprovalcycleRepository) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
        this.clientconfigRepository = clientconfigRepository;
        this.permissionRepository = permissionRepository;
        this.passwordEncoder = passwordEncoder;
        this.defaultapprovalcycleRepository = defaultapprovalcycleRepository;
    }

    /***
     * Creates the base for a new user model, but does NOT save it on the database, or add the fkclient.
     * @param username
     * @param email
     * @param password
     * @param account_type
     * @return
     */
    private User _createUser(String username, String email, String password, Short account_type){
        User newUser = new User();
        newUser.setUsername(username);
        newUser.setEmail(email);
        newUser.setPassword(passwordEncoder.encode(password));
        newUser.setAccountType(account_type);
        return newUser;
    }

    /***
     * Creates the base for a new profile model for a specific user, but does NOT save it on the database.
     * @param user
     * @return
     */
    private Profile _createProfileForUser(User user){
        Profile newProfile = new Profile();
        newProfile.setUser(user);
        return newProfile;
    }

    /***
     * Creates the base for a new clientconfig model for a specific user, but does NOT save it on the database.
     * @param user
     * @return
     */
    private Clientconfig _createClientconfigForUser(User user){
        Clientconfig newClientconfig = new Clientconfig();
        newClientconfig.setUser(user);
        return newClientconfig;
    }

    private Permission _setDefaultCompanyOwnerPermission(User user){
        Permission permission = new Permission();
        permission.setUser(user);
        permission.setCanApprovation(true);
        permission.setCanForms(true);
        permission.setCanManagement(true);
        permission.setCanFrontend(true);
        return permission;
    }

    private Permission _setDefaultUserPermission(User user){
        Permission permission = new Permission();
        permission.setUser(user);
        permission.setCanFrontend(true);
        return permission;
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

    public User findById(int id){
        Optional<User> user = userRepository.findById(id);

        //orElse -> throw new Exception("User not found");
        return user.orElse(null);
    }

    public User findByIdAndUser(int id, User requestingUser) {
        Optional<User> user = userRepository.findById(id);

        if(user.isPresent()){
            User clientUser1 = _getClientUser(user.get());
            User clientUser2 = _getClientUser(requestingUser);
            if(Objects.equals(clientUser1.getId(), clientUser2.getId())){
                return user.get();
            }
        }

        return null;
    }

    public User findByUsername(String username){
        return userRepository.findFirstByUsername(username);
    }

    public User findBySubdomain(String subdomain){
        Clientconfig clientconfig = clientconfigRepository.findFirstBySubdomain(subdomain);
        if(clientconfig == null){
            return null;
        }
        return clientconfig.getUser();
    }

    public List<User> findAllAvailableOperatorsByUser(User requestingUser) {
        User clientUser = _getClientUser(requestingUser);

        List<User> usersFromClient = userRepository.findAllByFkclientOrId(clientUser, clientUser.getId());

        return usersFromClient.stream().filter(user -> {
            Defaultapprovalcycle defCycle = defaultapprovalcycleRepository.findFirstByFkclientAndFkoperator(clientUser, user);
            if(defCycle != null){
                return false;
            }
            Boolean canApprovation = user.getPermissions().getCanApprovation();
            return canApprovation != null && canApprovation;
        }).collect(Collectors.toList());
    }

    public List<User> findAllByUser(User requestingUser) {
        User clientUser = _getClientUser(requestingUser);

        return userRepository.findAllByFkclientOrId(clientUser, clientUser.getId());
    }

    public User registerClient(String username, String email, String password, String company_name) {
        if(userRepository.findFirstByUsername(username) != null){
            return null;
        }

        if(email != null && userRepository.findFirstByEmail(email) != null){
            return null;
        }

        User newUser = _createUser(username, email, password, (short)2);
        userRepository.saveAndFlush(newUser);

        Profile newProfile = _createProfileForUser(newUser);
        profileRepository.save(newProfile);

        Clientconfig newClientConfig = _createClientconfigForUser(newUser);
        if(company_name != null){
            newClientConfig.setCompanyName(company_name);
        }
        clientconfigRepository.save(newClientConfig);

        Permission permission = _setDefaultCompanyOwnerPermission(newUser);
        permissionRepository.save(permission);

        return newUser;
    }

    public User registerUserByClient(String username, String email, String password, User clientUser) {
        if(userRepository.findFirstByUsername(username) != null){
            return null;
        }

        if(email != null && userRepository.findFirstByEmailAndFkclient(email, clientUser) != null){
            return null;
        }

        User newUser = _createUser(username, email, password, (short)1);

        newUser.setFkclient(clientUser);
        userRepository.saveAndFlush(newUser);

        Profile newProfile = _createProfileForUser(newUser);
        profileRepository.save(newProfile);

        Permission permission = _setDefaultUserPermission(newUser);
        permissionRepository.save(permission);

        Clientconfig newClientConfig = _createClientconfigForUser(newUser);
        clientconfigRepository.save(newClientConfig);

        // return userRepository.findById(newUser.getId()).orElse(null)
        return newUser;
    }

    public User registerUserByClientUsername(String username, String email, String password, String client_username) {
        User clientUser = userRepository.findFirstByUsername(client_username);

        if(clientUser == null){
            //throw new Exception("Client user not found");
            return null;
        }

        if(userRepository.findFirstByUsername(username) != null){
            return null;
        }

        if(email != null && userRepository.findFirstByEmailAndFkclient(email, clientUser) != null){
            return null;
        }

        User newUser = _createUser(username, email, password, (short)1);

        newUser.setFkclient(clientUser);
        userRepository.saveAndFlush(newUser);

        Profile newProfile = _createProfileForUser(newUser);
        profileRepository.save(newProfile);

        Permission permission = _setDefaultUserPermission(newUser);
        permissionRepository.save(permission);

        Clientconfig newClientConfig = _createClientconfigForUser(newUser);
        clientconfigRepository.save(newClientConfig);
        return newUser;
    }


}
