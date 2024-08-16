package com.revature.services;


import com.revature.models.UserModel;
import com.revature.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service  // This annotation is crucial to make this class a Spring bean
public class UserModelDetailService implements UserDetailsService {

//    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserModel> user = userRepo.findByUsername(username);
        if (user.isPresent()) {
            return User.builder()
                    .username(user.get().getUsername())
                    .password(user.get().getPasswordHash()) // Assuming passwordHash contains the hashed password
                    .build();
        } else {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
    }
}