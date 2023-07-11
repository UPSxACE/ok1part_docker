package com.example.ok1part_spring.controllers;

import com.example.ok1part_spring.dto.ClientconfigDto;
import com.example.ok1part_spring.dto.EformDto;
import com.example.ok1part_spring.dto.EreasonDto;
import com.example.ok1part_spring.dto.UserwhitelistedipDto;
import com.example.ok1part_spring.dto.request.RequestEformDto;
import com.example.ok1part_spring.models.Clientconfig;
import com.example.ok1part_spring.models.User;
import com.example.ok1part_spring.models.Userwhitelistedip;
import com.example.ok1part_spring.services.ClientconfigService;
import com.example.ok1part_spring.utils.Identity;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/client-config")
@CrossOrigin(origins = "*")
public class ClientConfigController {

    private final ClientconfigService clientconfigService;
    private final Identity identity;

    public ClientConfigController(ClientconfigService clientconfigService, Identity identity) {
        this.clientconfigService = clientconfigService;
        this.identity = identity;
    }

    @GetMapping("")
    public ResponseEntity<ClientconfigDto> getClientConfig(){
        User user = identity.getUserModel();

        Clientconfig clientconfig = clientconfigService.getUserClientConfig(user);

        ModelMapper modelMapper = new ModelMapper();
        ClientconfigDto clientconfigDto = modelMapper.map(clientconfig, ClientconfigDto.class);

        return new ResponseEntity<>(clientconfigDto, HttpStatus.OK);
    }

    @GetMapping("/whitelisted-ips")
    public ResponseEntity<List<UserwhitelistedipDto>> getWhitelistedIps() {
        User user = identity.getUserModel();
        User clientUser = user.getFkclient() != null ? user.getFkclient() : user;

        List<Userwhitelistedip> ips = clientconfigService.getWhitelistedipsByClientUser(clientUser);

        ModelMapper modelMapper = new ModelMapper();
        List<UserwhitelistedipDto> ipsDto = ips.stream().map(
                        ip -> modelMapper.map(ip, UserwhitelistedipDto.class))
                .toList();

        return new ResponseEntity<>(ipsDto, HttpStatus.OK);
    }

    @PostMapping("/whitelist-ip")
    public ResponseEntity<List<UserwhitelistedipDto>> postWhitelistIp(@RequestParam(value = "ip") String ip){
        User user = identity.getUserModel();
        User clientUser = user.getFkclient() != null ? user.getFkclient() : user;

        List<Userwhitelistedip> updatedIps = clientconfigService.whitelistIpByClientUser(ip, clientUser);

        ModelMapper modelMapper = new ModelMapper();
        List<UserwhitelistedipDto> updatedIpsDto = updatedIps.stream().map(
                        ip_ -> modelMapper.map(ip_, UserwhitelistedipDto.class))
                .toList();

        return new ResponseEntity<>(updatedIpsDto, HttpStatus.OK);
    }

    @DeleteMapping("/remove-whitelisted-ip")
    public ResponseEntity<List<UserwhitelistedipDto>> deleteWhitelistedIp(@RequestParam(value = "ip") String ip){
        User user = identity.getUserModel();
        User clientUser = user.getFkclient() != null ? user.getFkclient() : user;

        List<Userwhitelistedip> updatedIps = clientconfigService.removeIpFromWhitelistByClientUser(ip, clientUser);

        ModelMapper modelMapper = new ModelMapper();
        List<UserwhitelistedipDto> updatedIpsDto = updatedIps.stream().map(
                        ip_ -> modelMapper.map(ip_, UserwhitelistedipDto.class))
                .toList();

        return new ResponseEntity<>(updatedIpsDto, HttpStatus.OK);
    }

    @PatchMapping("")
    public ResponseEntity<ClientconfigDto> updateClientConfig(@RequestBody Clientconfig body){
        User user = identity.getUserModel();

        Clientconfig clientconfig = clientconfigService.getUserClientConfig(user);

        if(clientconfig == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        body.setId(null);
        Clientconfig updatedClientconfig = clientconfigService.updateUserClientConfig(clientconfig, body);

        ModelMapper modelMapper = new ModelMapper();
        ClientconfigDto updatedClientconfigDto = modelMapper.map(updatedClientconfig, ClientconfigDto.class);

        return new ResponseEntity<>(updatedClientconfigDto, HttpStatus.OK);
    }
}
