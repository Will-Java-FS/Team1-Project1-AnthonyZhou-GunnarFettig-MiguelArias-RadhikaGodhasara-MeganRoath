package com.revature.SecurityConfiguration;

import com.revature.services.UserModelDetailService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetailsService;

@Configuration
public class UserDetailsServiceConfig {

    @Bean
    public UserDetailsService userDetailsService(UserModelDetailService userModelDetailService) {
        return userModelDetailService;
    }
}
