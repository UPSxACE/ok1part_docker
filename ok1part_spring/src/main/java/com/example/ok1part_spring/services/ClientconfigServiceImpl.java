package com.example.ok1part_spring.services;

import com.example.ok1part_spring.models.Clientconfig;
import com.example.ok1part_spring.models.User;
import com.example.ok1part_spring.models.Userwhitelistedip;
import com.example.ok1part_spring.repositories.ClientconfigRepository;
import com.example.ok1part_spring.repositories.UserwhitelistedipRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ClientconfigServiceImpl implements ClientconfigService{
    private final ClientconfigRepository clientconfigRepository;
    private final UserwhitelistedipRepository userwhitelistedipRepository;

    public ClientconfigServiceImpl(ClientconfigRepository clientconfigRepository,
                                   UserwhitelistedipRepository userwhitelistedipRepository) {
        this.clientconfigRepository = clientconfigRepository;
        this.userwhitelistedipRepository = userwhitelistedipRepository;
    }

    public Clientconfig getUserClientConfig(User user) {
        Optional<Clientconfig> clientconfig = clientconfigRepository.findById(user.getId());
        return clientconfig.orElse(null);
    }

    @Override
    public Clientconfig updateUserClientConfig(Clientconfig clientconfig, Clientconfig clientconfigUpdates) {
        String subdomain = clientconfigUpdates.getSubdomain();
        String companyNumber = clientconfigUpdates.getCompanyNumber();
        String companyStreet = clientconfigUpdates.getCompanyStreet();
        String companyStreet2 = clientconfigUpdates.getCompanyStreet2();
        String companyCity = clientconfigUpdates.getCompanyCity();
        String companyRegion = clientconfigUpdates.getCompanyRegion();
        String companyPostal = clientconfigUpdates.getCompanyPostal();
        String companyCountry = clientconfigUpdates.getCompanyCountry();
        String companyPhone = clientconfigUpdates.getCompanyPhone();
        String companyName = clientconfigUpdates.getCompanyName();
        String companyLogo = clientconfigUpdates.getCompanyLogo();
        String companyColor = clientconfigUpdates.getCompanyColor();
        String companyEmail = clientconfigUpdates.getCompanyEmail();

        if (subdomain != null) {
            clientconfig.setSubdomain(subdomain);
        }
        if (companyNumber != null) {
            clientconfig.setCompanyNumber(companyNumber);
        }
        if (companyStreet != null) {
            clientconfig.setCompanyStreet(companyStreet);
        }
        if (companyStreet2 != null) {
            clientconfig.setCompanyStreet2(companyStreet2);
        }
        if (companyCity != null) {
            clientconfig.setCompanyCity(companyCity);
        }
        if (companyRegion != null) {
            clientconfig.setCompanyRegion(companyRegion);
        }
        if (companyPostal != null) {
            clientconfig.setCompanyPostal(companyPostal);
        }
        if (companyCountry != null) {
            clientconfig.setCompanyCountry(companyCountry);
        }
        if (companyPhone != null) {
            clientconfig.setCompanyPhone(companyPhone);
        }
        if (companyName != null) {
            clientconfig.setCompanyName(companyName);
        }
        if (companyLogo != null) {
            clientconfig.setCompanyLogo(companyLogo);
        }
        if (companyColor != null) {
            clientconfig.setCompanyColor(companyColor);
        }
        if (companyEmail != null) {
            clientconfig.setCompanyEmail(companyEmail);
        }

        return clientconfigRepository.save(clientconfig);
    }

    public List<Userwhitelistedip> getWhitelistedipsByClientUser(User clientUser) {
        return userwhitelistedipRepository.findAllByFkclient(clientUser);
    }

    public List<Userwhitelistedip> whitelistIpByClientUser(String ip, User clientUser) {
        Userwhitelistedip newWhitelistedIp = new Userwhitelistedip();
        newWhitelistedIp.setIp(ip);
        newWhitelistedIp.setFkclient(clientUser);
        userwhitelistedipRepository.saveAndFlush(newWhitelistedIp);
        return getWhitelistedipsByClientUser(clientUser);
    }

    @Override
    public List<Userwhitelistedip> removeIpFromWhitelistByClientUser(String ip, User clientUser) {
        List<Userwhitelistedip> ipToDelete = userwhitelistedipRepository.findAllByFkclientAndIp(clientUser, ip);
        userwhitelistedipRepository.deleteAll(ipToDelete);
        return getWhitelistedipsByClientUser(clientUser);
    }

    public List<User> getWhitelistedClientsByIp(String ip) {
        List<Userwhitelistedip> ips = userwhitelistedipRepository.findAllByIp(ip);
        List<User> clients = ips.stream().map(ip_ ->  ip_.getFkclient()).toList();
        return clients;
    }
}
