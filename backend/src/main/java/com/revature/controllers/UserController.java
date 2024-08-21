package com.revature.controllers;

import com.revature.WebToken.JwtService;
import com.revature.WebToken.LoginForm;
import com.revature.models.AuthResponse;
import com.revature.models.UserModel;
import com.revature.repositories.UserRepo;
import com.revature.services.UserModelDetailService;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepo userRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserModelDetailService userModelDetailService;

  @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserModel userModel) {
        Optional<UserModel> existingUser = userRepo.findByUsername(userModel.getUsername());

        if (existingUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists.");
        }

        userModel.setPasswordHash(passwordEncoder.encode(userModel.getPasswordHash()));
        userRepo.save(userModel);

        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully.");
    }

    @PostMapping("/authenticate")
    public AuthResponse authAndGetToken(@RequestBody LoginForm loginForm){
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginForm.username(), loginForm.password()
        ));

        if(authentication.isAuthenticated()){
            Optional<UserModel> optionalUser = userRepo.findByUsername(loginForm.username());
            UserModel user = optionalUser.get();
            String token = jwtService.generateToken(userModelDetailService.loadUserByUsername(loginForm.username()));

            if(optionalUser.isEmpty()){
                throw new UsernameNotFoundException("User not found");
            }

            return new AuthResponse(user.getUsername(), user.getId(), user.getRole(), token);
        }
        else{
            throw new UsernameNotFoundException("Invalid credentials");
        }
    }
}
