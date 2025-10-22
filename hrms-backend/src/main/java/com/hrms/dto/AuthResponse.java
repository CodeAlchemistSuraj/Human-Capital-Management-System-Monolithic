package com.hrms.dto;

// DTO for login response, holding the JWT, username, and role
public class AuthResponse {
    private String token;
    private String username; // Added
    private String role;     // Added
    private String message;

    // Default constructor for Spring
    public AuthResponse() {}

    // Constructor for successful login
    public AuthResponse(String token, String username, String role, String message) {
        this.token = token;
        this.username = username;
        this.role = role;
        this.message = message;
    }

    // Constructor for error/simple message (if token is null)
    public AuthResponse(String message) {
        this.message = message;
    }

    // Getters
    public String getToken() {
        return token;
    }
    public String getUsername() {
        return username;
    }
    public String getRole() {
        return role;
    }
    public String getMessage() {
        return message;
    }

    // Setters (optional, but good practice for DTOs)
    public void setToken(String token) {
        this.token = token;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public void setRole(String role) {
        this.role = role;
    }
    public void setMessage(String message) {
        this.message = message;
    }
}
