package com.example.ok1part_spring.services;

import com.example.ok1part_spring.models.Clientconfig;
import com.example.ok1part_spring.models.User;
import com.example.ok1part_spring.models.Userwhitelistedip;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ClientconfigService {
    Clientconfig getUserClientConfig(User user);
    Clientconfig updateUserClientConfig(Clientconfig clientconfig, Clientconfig clientconfigUpdates);
    List<Userwhitelistedip> whitelistIpByClientUser(String ip, User clientUser);
    List<Userwhitelistedip> removeIpFromWhitelistByClientUser(String ip, User clientUser);
    List<Userwhitelistedip> getWhitelistedipsByClientUser(User clientUser);
    List<User> getWhitelistedClientsByIp(String ip);
}
