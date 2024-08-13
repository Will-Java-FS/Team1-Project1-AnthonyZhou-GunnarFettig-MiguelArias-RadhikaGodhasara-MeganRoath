package com.revature.controllers;


import com.revature.models.UserModel;
import com.revature.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserRepo userRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public UserModel registerUser(@RequestBody UserModel userModel){
        userModel.setPasswordHash(passwordEncoder.encode(userModel.getPasswordHash()));
        return userRepo.save(userModel);
    }



}