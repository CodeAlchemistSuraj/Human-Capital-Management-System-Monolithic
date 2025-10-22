package com.hrms.controller;

import com.hrms.config.JwtUtils;
import com.hrms.dto.AuthRequest;
import com.hrms.dto.AuthResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> authenticateUser(@RequestBody AuthRequest authRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
            );

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            String role = userDetails.getAuthorities().stream()
                                     .map(GrantedAuthority::getAuthority)
                                     .filter(a -> a.startsWith("ROLE_"))
                                     .map(a -> a.substring("ROLE_".length()))
                                     .findFirst()
                                     .orElse("USER");

            // --- START DEBUG LOG ---
            System.out.println("DEBUG: AuthController - User '" + userDetails.getUsername() + "' authenticated.");
            System.out.println("DEBUG: AuthController - Granted Authorities: " + userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining(", ")));
            System.out.println("DEBUG: AuthController - Extracted Role for JWT: '" + role + "'");
            // --- END DEBUG LOG ---

            String jwt = jwtUtils.generateJwtToken(userDetails.getUsername(), role);

            return ResponseEntity.ok(new AuthResponse(jwt, userDetails.getUsername(), role, "Login successful!"));

        } catch (BadCredentialsException e) {
            System.err.println("Authentication failed for user " + authRequest.getUsername() + ": Invalid credentials.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new AuthResponse("Invalid username or password."));
        } catch (Exception e) {
            System.err.println("An unexpected error occurred during authentication for user " + authRequest.getUsername() + ": " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new AuthResponse("An unexpected error occurred: " + e.getMessage()));
        }
    }
}
