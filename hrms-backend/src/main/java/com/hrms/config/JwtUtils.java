package com.hrms.config;

import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtils {

    private static final long EXPIRATION_TIME = 86400000; // 24 hours
    private final SecretKey signingKey;

    public JwtUtils() {
        // Generate a secure key for HS512
        this.signingKey = Jwts.SIG.HS512.key().build();
    }

    public String generateJwtToken(String username, String role) {
        try {
            if (username == null || role == null) {
                System.err.println("Cannot generate JWT: username or role is null. Username: " + username + ", Role: " + role);
                throw new IllegalArgumentException("Username and role cannot be null");
            }
            System.out.println("Generating JWT for username: " + username + ", role: " + role);
            String token = Jwts.builder()
                    .setSubject(username)
                    .claim("role", role)
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                    .signWith(signingKey, Jwts.SIG.HS512) // Explicitly specify HS512 algorithm
                    .compact();
            System.out.println("JWT generated successfully: " + token);
            return token;
        } catch (Exception e) {
            System.err.println("Error in JwtUtils.generateJwtToken: " + e.getMessage());
            throw e;
        }
    }

    public SecretKey getSigningKey() {
        return signingKey;
    }
}