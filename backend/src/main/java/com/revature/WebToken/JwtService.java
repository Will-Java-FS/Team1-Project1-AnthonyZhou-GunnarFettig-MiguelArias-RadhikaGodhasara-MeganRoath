package com.revature.WebToken;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Service
public class JwtService {

    public static final String SECRET = "40AE8FEC2BBD73571773E5D8C925D74F564F6C38DA5DAFFBA2A7555D69E3C4D21DA9756E87A5B4F30B5C5023498282597F93E0794F1948B603AAD92FDDD91AF6";
    private static final long validity = TimeUnit.MINUTES.toMillis(30);

    public String generateToken(UserDetails userDetails){
        Map<String, String> claims = new HashMap<>();
        claims.put("this is a ?", "test");

       return Jwts.builder()
                .claims(claims)
                .subject(userDetails.getUsername())
                .issuedAt(Date.from(Instant.now()))
                .expiration(Date.from(Instant.now().plusMillis(validity)))
                .signWith(generateKey())
                .compact();
    }

    private SecretKey generateKey(){
        byte[] decodedKey = Base64.getDecoder().decode(SECRET);
        return Keys.hmacShaKeyFor(decodedKey);
    }
}
