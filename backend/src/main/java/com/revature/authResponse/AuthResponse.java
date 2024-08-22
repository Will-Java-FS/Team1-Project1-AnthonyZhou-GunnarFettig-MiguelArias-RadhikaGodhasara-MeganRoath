package com.revature.authResponse;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {

    private String username;
    private Long userId;
    private String role;
    private String token;
}
