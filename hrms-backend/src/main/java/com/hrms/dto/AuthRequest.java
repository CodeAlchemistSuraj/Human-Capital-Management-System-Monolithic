// src/main/java/com/hrms/dto/AuthRequest.java
package com.hrms.dto;

// DTO for incoming login requests
public class AuthRequest {
    private String username;
    private String password;

    // Default constructor for Spring
    public AuthRequest() {}

    public AuthRequest(String username, String password) {
        this.username = username;
    }

    // Getters and Setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
